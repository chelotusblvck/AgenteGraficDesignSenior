"""Renderiza motion/motoops_day (30 s, 900 frames @30fps) a output/motoops_day.mp4 (1080x1920).

Uso: python render_motoops_day.py [--frames 0 120 300 ...]   # con --frames solo guarda PNG de revisión
El render completo captura 900 fotogramas (viewport 540x960, deviceScaleFactor 2); no tiene timeout propio.
"""
import argparse
from src.motion import render_html_to_mp4

ap = argparse.ArgumentParser()
ap.add_argument("--frames", type=int, nargs="*")
a = ap.parse_args()
print(render_html_to_mp4("motion/motoops_day/index.html", "output/motoops_day.mp4",
                         540, 960, 30, fps=30, scale=2, frames=a.frames))
