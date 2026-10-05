import os
import json
from dotenv import load_dotenv
from anthropic import Anthropic
from src.prompts_creative import get_system_prompt

load_dotenv()
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def load_brand_guidelines(docs_path: str = "docs") -> str:
    """Busca y lee todos los archivos .md dentro de la carpeta docs/."""
    guidelines_text = ""
    if os.path.exists(docs_path):
        for file in os.listdir(docs_path):
            if file.endswith(".md"):
                file_path = os.path.join(docs_path, file)
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
        model="claude-3-5-sonnet-20241022",
        max_tokens=1000,
        temperature=0.7,
        system=system_prompt,
        messages=[
            {"role": "user", "content": f"Crea una campaña/post para: {concept}"}
        ]
    )
    
    raw_content = response.content[0].text
    return json.loads(raw_content)