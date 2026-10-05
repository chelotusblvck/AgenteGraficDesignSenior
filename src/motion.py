import os
import re
import shutil
import subprocess
import tempfile
from src.agent import client, load_brand_guidelines
from src.prompts_motion import get_motion_system_prompt

FORMATS = {
    "story": (1080, 1920),  # 9:16
    "feed": (1080, 1080),   # 1:1
}
FPS = 30


def generate_motion_html(prompt: str, width: int, height: int, duration: float, docs_path: str = "docs") -> str:
    """Pide a Claude una escena HTML animada que respeta los lineamientos de marca."""
    guidelines = load_brand_guidelines(docs_path)
    response = client.messages.create(
        model="claude-sonnet-5-5",
        max_tokens=16000,
        system=get_motion_system_prompt(guidelines, width, height, duration),
        messages=[{"role": "user", "content": f"Diseña una pieza de motion graphics para: {prompt}"}],
    )
    raw = next(b.text for b in response.content if b.type == "text").strip()
    return re.sub(r"^```(?:html)?\s*|\s*```$", "", raw, flags=re.MULTILINE).strip()


def render_html_to_mp4(html_path: str, output_path: str, width: int, height: int, duration: float, fps: int = FPS,
                       scale: int = 1, frames: list | None = None) -> str:
    """Congela las animaciones del documento y captura cada fotograma con Chromium; ffmpeg arma el MP4.

    scale: deviceScaleFactor (viewport 540x960 con scale=2 -> video de 1080x1920).
    frames: si se entrega, solo captura esos fotogramas como PNG sueltos junto al MP4 (para revisión) y no arma el video.
    """
    from playwright.sync_api import sync_playwright

    if not shutil.which("ffmpeg"):
        raise RuntimeError("ffmpeg no está instalado o no está en el PATH.")

    total = round(duration * fps)
    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)

    with tempfile.TemporaryDirectory() as frames_dir, sync_playwright() as p:
        browser = p.chromium.launch(executable_path=os.getenv("CHROMIUM_PATH") or None)
        page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=scale)
        page.goto(f"file://{os.path.abspath(html_path)}")
        page.wait_for_load_state("networkidle")
        # Precarga de SVGs y fuentes (la escena puede exponer window.__ready)
        page.evaluate("Promise.all([window.__ready, document.fonts.ready])")

        if frames:
            stem = os.path.splitext(output_path)[0]
            for i in frames:
                page.evaluate("t => document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; })", i * 1000 / fps)
                page.screenshot(path=f"{stem}_f{i:03d}.png")
            browser.close()
            return stem

        for i in range(total):
            t_ms = i * 1000 / fps
            # Posiciona todas las animaciones CSS/WAAPI en el instante t (delays incluidos)
            page.evaluate(
                "t => document.getAnimations().forEach(a => { a.pause(); a.currentTime = t; })", t_ms
            )
            page.screenshot(path=os.path.join(frames_dir, f"frame_{i:05d}.png"))
        browser.close()

        subprocess.run(
            [
                "ffmpeg", "-y", "-loglevel", "error",
                "-framerate", str(fps),
                "-i", os.path.join(frames_dir, "frame_%05d.png"),
                "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-movflags", "+faststart",
                output_path,
            ],
            check=True,
        )
    return output_path
