from PIL import Image

# Open the image
img = Image.open(r"c:\Users\Legion\Documents\website ardc\assets\icons\partners\wecon.png")

# Convert to RGBA if not already
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# Get image data
data = img.getdata()

# Create new data list with transparent background
new_data = []
for item in data:
    # If pixel is white (or very close to white), make it transparent
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)

# Update image data
img.putdata(new_data)

# Save the image
img.save(r"c:\Users\Legion\Documents\website ardc\assets\icons\partners\wecon.png")
print("Background removed and saved")
