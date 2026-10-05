import os
from src.agent import generate_creative_concept
from src.image_gen import generate_image

def main():
    # 1. Idea de prueba
    concepto = "Lanzamiento de una marca de café de especialidad sustentable en Santiago"
    
    print(f"🚀 Iniciando generación para el concepto: '{concepto}'\n")

    # 2. Obtener concepto y copy de Claude
    result = generate_creative_concept(concepto)
    
    # 3. Guardar el post (.md) en la carpeta output/
    output_md_path = "output/post_01_content.md"
    os.makedirs("output", exist_ok=True)
    
    with open(output_md_path, "w", encoding="utf-8") as f:
        f.write(f"# Post de Redes Sociales\n\n")
        f.write(f"## Copy\n{result['copy']}\n\n")
        f.write(f"## Hashtags\n{result['hashtags']}\n\n")
        f.write(f"## Prompt Usado para DALL-E\n`{result['dalle_prompt']}`\n")
        
    print(f"📝 Contenido guardado en: {output_md_path}")

    # 4. Generar la imagen con DALL-E 3
    generate_image(
        prompt_text=result["dalle_prompt"],
        output_path="output/post_01_image.png"
    )
    
    print("\n✨ ¡Proceso completado con éxito! Revisa la carpeta output/")

if __name__ == "__main__":
    main()