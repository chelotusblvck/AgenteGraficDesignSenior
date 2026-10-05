import os
import json
import re
from dotenv import load_dotenv
from anthropic import Anthropic
from src.prompts_creative import get_system_prompt

load_dotenv()
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


def load_brand_guidelines(docs_path: str = "docs") -> str:
    """Busca y lee todos los archivos .md dentro de docs/ y sus subcarpetas."""
    guidelines_text = ""
    if os.path.exists(docs_path):
        for root, _, files in os.walk(docs_path):
            for file in files:
                if file.endswith(".md"):
                    file_path = os.path.join(root, file)
                    with open(file_path, "r", encoding="utf-8") as f:
                        guidelines_text += f"\n--- Contenido de {file} ---\n" + f.read() + "\n"
    
    if not guidelines_text:
        guidelines_text = "No se encontraron lineamientos específicos. Usar un estilo limpio, moderno y profesional."
        
    return guidelines_text


def generate_creative_concept(concept: str, docs_path: str = "docs") -> dict:
    """Lee los lineamientos, consulta a Claude y retorna el concepto estructurado."""
    print("📖 Leyendo lineamientos gráficos y de marca desde docs/...")
    guidelines = load_brand_guidelines(docs_path)
    
    system_prompt = get_system_prompt(guidelines)

    print("🧠 Consultando al Agente Creativo (Claude) con lineamientos aplicados...")
    
    response = client.messages.create(
        model="claude-sonnet-5-5",  # Modelo actual para producción
        max_tokens=2500,                   # Margen suficiente para no cortar el JSON
        temperature=0.7,
        system=system_prompt,
        messages=[
            {"role": "user", "content": f"Crea una campaña/post para: {concept}"}
        ]
    )
    
    raw_content = response.content[0].text.strip()
    
    # Limpia marcas de bloque de código (```json ... ```) si Claude las incluye
    cleaned_content = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw_content, flags=re.MULTILINE).strip()
    
    return json.loads(cleaned_content)