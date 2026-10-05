"""Renderiza motion/garage360_launch (15 s, 450 frames @30fps) a output/garage360_launch.mp4 (1080x1920).

Uso: python render_launch.py [--frames 0 10 100 ...]   # con --frames solo guarda PNG de revisión
"""
import argparse
from src.motion import render_html_to_mp4

ap = argparse.ArgumentParser()
ap.add_argument("--frames", type=int, nargs="*")
a = ap.parse_args()
print(render_html_to_mp4("motion/garage360_launch/index.html", "output/garage360_launch.mp4",
                         540, 960, 15, fps=30, scale=2, frames=a.frames))
