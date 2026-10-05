import os
import requests
from dotenv import load_dotenv
from openai import OpenAI

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Inicializar el cliente de OpenAI pasándole la API Key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def generate_image(prompt_text: str, output_path: str = "output/post_01_image.png") -> str:
    """
    Genera una imagen utilizando DALL-E 3 con parámetros optimizados de bajo costo.
    
    :param prompt_text: Descripción de la imagen creada por Claude.
    :param output_path: Ruta de destino para guardar el archivo .png.
    :return: Ruta del archivo guardado.
    """
    try:
        print("🎨 Generando imagen con DALL-E 3 (Calidad Standard)...")

        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt_text,
            size="1024x1024",      # Tamaño cuadrado (1:1), ideal para posts
            quality="standard",     # Standard = $0.04 USD por imagen ($0.08 si fuera "hd")
            n=1                     # DALL-E 3 solo permite n=1 por petición
        )

        # Obtener la URL de la imagen generada
        image_url = response.data[0].url

        # Descargar la imagen e guardarla localmente en la carpeta output
        image_bytes = requests.get(image_url).content
        
        # Asegurarse de que la carpeta de destino exista
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        with open(output_path, "wb") as f:
            f.write(image_bytes)

        print(f"✅ Imagen guardada con éxito en: {output_path}")
        return output_path

    except Exception as e:
        print(f"❌ Error al generar la imagen: {e}")
        raise e