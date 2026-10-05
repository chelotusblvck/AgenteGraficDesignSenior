import os
import base64
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_image(prompt_text: str, output_path: str, size: str = "1024x1024") -> str:
    """
    Genera una imagen con gpt-image-2 (dall-e-3 fue retirado de la API) según la resolución especificada.
    """
    try:
        print(f"🎨 Generando imagen gpt-image-2 ({size}) para {output_path}...")

        response = client.images.generate(
            model="gpt-image-2",
            prompt=prompt_text,
            size=size,
            n=1
        )

        # Los modelos gpt-image devuelven la imagen en base64, no como URL
        image_bytes = base64.b64decode(response.data[0].b64_json)
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        with open(output_path, "wb") as f:
            f.write(image_bytes)

        print(f"✅ Imagen guardada con éxito en: {output_path}")
        return output_path

    except Exception as e:
        print(f"❌ Error al generar la imagen: {e}")
        raise e