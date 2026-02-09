#!/usr/bin/env python3
"""
Generate placeholder images for First Step Montessori website
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create images directory if it doesn't exist
os.makedirs('images', exist_ok=True)

# Image configurations
images = [
    {'name': 'hero-bg.jpg', 'width': 1920, 'height': 1080, 'colors': ['#FF6B6B', '#4ECDC4'], 'text': 'Hero Background'},
    {'name': 'about.jpg', 'width': 800, 'height': 600, 'colors': ['#4ECDC4', '#FFE66D'], 'text': 'About Us'},
    {'name': 'practical-life.jpg', 'width': 800, 'height': 500, 'colors': ['#FFE66D', '#FF6B6B'], 'text': 'Practical Life'},
    {'name': 'sensorial.jpg', 'width': 800, 'height': 500, 'colors': ['#FF6B6B', '#764ba2'], 'text': 'Sensorial Learning'},
    {'name': 'language.jpg', 'width': 800, 'height': 500, 'colors': ['#667eea', '#4ECDC4'], 'text': 'Language & Literacy'},
    {'name': 'community-1.jpg', 'width': 600, 'height': 400, 'colors': ['#FF6B6B', '#FFE66D'], 'text': 'Community 1'},
    {'name': 'community-2.jpg', 'width': 600, 'height': 400, 'colors': ['#4ECDC4', '#667eea'], 'text': 'Community 2'},
    {'name': 'community-3.jpg', 'width': 600, 'height': 400, 'colors': ['#FFE66D', '#FF6B6B'], 'text': 'Community 3'},
    {'name': 'community-4.jpg', 'width': 600, 'height': 400, 'colors': ['#764ba2', '#4ECDC4'], 'text': 'Community 4'},
    {'name': 'community-5.jpg', 'width': 600, 'height': 400, 'colors': ['#FF6B6B', '#667eea'], 'text': 'Community 5'},
    {'name': 'community-6.jpg', 'width': 600, 'height': 400, 'colors': ['#4ECDC4', '#FFE66D'], 'text': 'Community 6'},
    {'name': 'program-1.jpg', 'width': 700, 'height': 500, 'colors': ['#667eea', '#764ba2'], 'text': 'Nature Explorers'},
    {'name': 'program-2.jpg', 'width': 700, 'height': 500, 'colors': ['#FF6B6B', '#FFE66D'], 'text': 'Creative Arts'},
    {'name': 'program-3.jpg', 'width': 700, 'height': 500, 'colors': ['#4ECDC4', '#667eea'], 'text': 'Math & Science'},
    {'name': 'program-4.jpg', 'width': 700, 'height': 500, 'colors': ['#FFE66D', '#FF6B6B'], 'text': 'Cultural Studies'},
    {'name': 'program-5.jpg', 'width': 700, 'height': 500, 'colors': ['#764ba2', '#4ECDC4'], 'text': 'Life Skills'},
    {'name': 'program-6.jpg', 'width': 700, 'height': 500, 'colors': ['#FF6B6B', '#4ECDC4'], 'text': 'Social Learning'}
]

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_gradient_image(width, height, color1, color2):
    """Create a gradient image"""
    base = Image.new('RGB', (width, height), color1)
    top = Image.new('RGB', (width, height), color2)
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            mask_data.append(int(255 * (y / height)))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def add_decorative_circles(draw, width, height):
    """Add decorative circles to the image"""
    # Circle 1
    circle1_x = int(width * 0.2)
    circle1_y = int(height * 0.3)
    circle1_r = 150
    draw.ellipse([circle1_x - circle1_r, circle1_y - circle1_r, 
                  circle1_x + circle1_r, circle1_y + circle1_r], 
                 fill=(255, 255, 255, 80))
    
    # Circle 2
    circle2_x = int(width * 0.8)
    circle2_y = int(height * 0.7)
    circle2_r = 200
    draw.ellipse([circle2_x - circle2_r, circle2_y - circle2_r, 
                  circle2_x + circle2_r, circle2_y + circle2_r], 
                 fill=(255, 255, 255, 80))

def generate_image(config):
    """Generate a single placeholder image"""
    width = config['width']
    height = config['height']
    color1 = hex_to_rgb(config['colors'][0])
    color2 = hex_to_rgb(config['colors'][1])
    
    # Create gradient background
    img = create_gradient_image(width, height, color1, color2)
    
    # Create overlay for circles
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    add_decorative_circles(draw, width, height)
    
    # Composite the overlay
    img = img.convert('RGBA')
    img = Image.alpha_composite(img, overlay)
    img = img.convert('RGB')
    
    # Add text
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fall back to default if not available
    try:
        font_large = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 60)
        font_small = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 30)
    except:
        try:
            font_large = ImageFont.truetype('/Library/Fonts/Arial.ttf', 60)
            font_small = ImageFont.truetype('/Library/Fonts/Arial.ttf', 30)
        except:
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
    
    # Draw main text with shadow
    text = config['text']
    bbox = draw.textbbox((0, 0), text, font=font_large)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (width - text_width) // 2
    y = (height - text_height) // 2 - 30
    
    # Shadow
    draw.text((x + 3, y + 3), text, fill=(0, 0, 0, 128), font=font_large)
    # Main text
    draw.text((x, y), text, fill=(255, 255, 255), font=font_large)
    
    # Draw subtitle
    subtitle = "First Step Montessori"
    bbox = draw.textbbox((0, 0), subtitle, font=font_small)
    sub_width = bbox[2] - bbox[0]
    sub_x = (width - sub_width) // 2
    sub_y = y + text_height + 20
    
    # Shadow
    draw.text((sub_x + 2, sub_y + 2), subtitle, fill=(0, 0, 0, 128), font=font_small)
    # Main text
    draw.text((sub_x, sub_y), subtitle, fill=(255, 255, 255), font=font_small)
    
    # Save image
    output_path = os.path.join('images', config['name'])
    img.save(output_path, 'JPEG', quality=90)
    print(f'✓ Generated {config["name"]}')

# Generate all images
print('Generating placeholder images for First Step Montessori...\n')
for img_config in images:
    generate_image(img_config)

print('\n✓ All placeholder images generated successfully!')
print('Images saved to the "images" folder.')
print('\nNote: Replace these with real photos of your school for best results!')
