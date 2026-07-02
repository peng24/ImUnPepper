from PIL import Image, ImageDraw

def flood_fill_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    ImageDraw.floodfill(img, (0, 0), (255, 0, 255, 255), thresh=30)
    ImageDraw.floodfill(img, (width-1, 0), (255, 0, 255, 255), thresh=30)
    ImageDraw.floodfill(img, (0, height-1), (255, 0, 255, 255), thresh=30)
    ImageDraw.floodfill(img, (width-1, height-1), (255, 0, 255, 255), thresh=30)
    
    datas = img.getdata()
    newData = []
    for item in datas:
        if item[0] == 255 and item[1] == 0 and item[2] == 255 and item[3] == 255:
            newData.append((0, 0, 0, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

flood_fill_transparent("public/imun_avatar.jpg", "public/imun_avatar_transparent.png")
flood_fill_transparent("public/pepper_avatar.jpg", "public/pepper_avatar_transparent.png")
print("Done")
