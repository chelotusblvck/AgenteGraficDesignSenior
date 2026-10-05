import os
from src.agent import generate_creative_concept
from src.image_gen import generate_image

def main():
    # Define aquí el servicio de tu plataforma
    concepto = "Lanzamiento de Garage360, MotoOps y AutoOps para redes sociales y paid media"
    
    print(f"🚀 Iniciando generación para el concepto: '{concepto}'\n")

    result = generate_creative_concept(concepto)
    
    output_md_path = "output/post_01_content.md"
    os.makedirs("output", exist_ok=True)
    
    with open(output_md_path, "w", encoding="utf-8") as f:
        f.write(f"# Post de Redes Sociales\n\n")
        f.write(f"## Copy\n{result['copy']}\n\n")
        f.write(f"## Hashtags\n{result['hashtags']}\n\n")
        f.write(f"## Prompt Usado para DALL-E\n`{result['dalle_prompt']}`\n")
        
    print(f"📝 Contenido guardado en: {output_md_path}")

    generate_image(
        prompt_text=result["dalle_prompt"],
        output_path="output/post_01_image.png"
    )
    
    print("\n✨ ¡Proceso completado con éxito! Revisa la carpeta output/")

if __name__ == "__main__":
    main()