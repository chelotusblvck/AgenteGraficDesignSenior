import argparse
import os
import re
import unicodedata
from src.motion import FORMATS, generate_motion_html, render_html_to_mp4


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "_", text.lower()).strip("_")[:40] or "motion"


def main():
    parser = argparse.ArgumentParser(description="Genera motion graphics (MP4) a partir de un prompt.")
    parser.add_argument("prompt", nargs="*", help="Idea de la pieza. Si se omite, se pide por consola.")
    parser.add_argument("--format", choices=[*FORMATS, "both"], default="both", help="story (9:16), feed (1:1) o both")
    parser.add_argument("--duration", type=float, default=8.0, help="Duración en segundos (default 8)")
    args = parser.parse_args()

    prompt = " ".join(args.prompt).strip() or input("🎬 Describe el motion graphic que quieres: ").strip()
    if not prompt:
        raise SystemExit("Se necesita un prompt.")

    slug = slugify(prompt)
    os.makedirs("output", exist_ok=True)
    names = list(FORMATS) if args.format == "both" else [args.format]

    for name in names:
        width, height = FORMATS[name]
        print(f"🧠 Diseñando animación {name} ({width}x{height}, {args.duration:g}s)...")
        html = generate_motion_html(prompt, width, height, args.duration)
        html_path = f"output/motion_{slug}_{name}.html"
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"🎞️  Renderizando {html_path}...")
        mp4 = render_html_to_mp4(html_path, f"output/motion_{slug}_{name}.mp4", width, height, args.duration)
        print(f"✅ {mp4}")


if __name__ == "__main__":
    main()
