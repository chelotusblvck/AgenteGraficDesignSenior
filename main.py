import os
from src.agent import generate_creative_concept
from src.image_gen import generate_image

def main():
    concepto = "Lanzamiento oficial del ecosistema de gestión para talleres mecánicos Garage360, MotoOps y AutoOps"
    
    print(f"🚀 Iniciando campaña multitarget: '{concepto}'\n")

    # 1. Obtener concepto de Claude
    result = generate_creative_concept(concepto)
    
    os.makedirs("output", exist_ok=True)
    
    # 2. Guardar el copy combinado en /output
    output_md_path = "output/lanzamiento_garage360_posts.md"
    with open(output_md_path, "w", encoding="utf-8") as f:
        f.write("# Campaña de Lanzamiento: Garage360 / MotoOps / AutoOps\n\n")
        f.write("## 1. Post de Feed (Instagram / LinkedIn)\n")
        f.write(f"{result['copy_feed']}\n\n")
        f.write(f"**Prompt DALL-E Feed:** `{result['prompt_dalle_feed']}`\n\n")
        f.write("---\n\n")
        f.write("## 2. Instagram Story (9:16)\n")
        f.write(f"{result['copy_story']}\n\n")
        f.write(f"**Prompt DALL-E Story:** `{result['prompt_dalle_story']}`\n")
        
    print(f"📝 Copys guardados en: {output_md_path}\n")

    # 3. Generar imagen para Feed (1024x1024)
    generate_image(
        prompt_text=result["prompt_dalle_feed"],
        output_path="output/feed_garage360.png",
        size="1024x1024"
    )

    # 4. Generar imagen para Stories (1024x1792)
    generate_image(
        prompt_text=result["prompt_dalle_story"],
        output_path="output/story_garage360.png",
        size="1024x1792"
    )
    
    print("\n✨ ¡Proceso completado! Se generaron el archivo .md y las 2 imágenes en /output")

if __name__ == "__main__":
    main()