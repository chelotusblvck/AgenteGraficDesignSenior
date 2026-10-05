import os
import requests
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_image(prompt_text: str, output_path: str, size: str = "1024x1024") -> str:
    """
    Genera una imagen con DALL-E 3 según la resolución especificada.
    - Feed: 1024x1024 ($0.04 USD)
    - Stories: 1024x1792 ($0.08 USD)
    """
    try:
        print(f"🎨 Generando imagen DALL-E 3 ({size}) para {output_path}...")

        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt_text,
            size=size,
            quality="standard",
            n=1
        )

        image_url = response.data[0].url
        image_bytes = requests.get(image_url).content
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        with open(output_path, "wb") as f:
            f.write(image_bytes)

        print(f"✅ Imagen guardada con éxito en: {output_path}")
        return output_path

    except Exception as e:
        print(f"❌ Error al generar la imagen: {e}")
        raise e