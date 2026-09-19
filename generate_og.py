import os
import urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

WIDTH = 1200
HEIGHT = 630

# Create fonts cache folder
os.makedirs("fonts_cache", exist_ok=True)
os.makedirs("public/assets", exist_ok=True)

# 1. Download beautiful Google Fonts for pixel-perfect typography
font_serif_path = "fonts_cache/CormorantGaramond-Bold.ttf"
if not os.path.exists(font_serif_path):
    try:
        url = "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_iE9GnM.ttf"
        urllib.request.urlretrieve(url, font_serif_path)
    except Exception as e:
        print("Failed to download Cormorant Garamond:", e)
        font_serif_path = "C:/Windows/Fonts/georgiab.ttf"

font_script_path = "fonts_cache/PetitFormalScript.ttf"
if not os.path.exists(font_script_path):
    try:
        url = "https://fonts.gstatic.com/s/petitformalscript/v19/B50TF6xQr2TXJBnGOFME6u5OR83oRP5qoHk.ttf"
        urllib.request.urlretrieve(url, font_script_path)
    except Exception as e:
        print("Failed to download Petit Formal Script:", e)
        font_script_path = "C:/Windows/Fonts/Gabriola.ttf"

# Load fonts with fallbacks
try:
    font_title = ImageFont.truetype(font_serif_path, 52)
    font_amp = ImageFont.truetype(font_script_path, 46)
    font_kicker = ImageFont.truetype(font_serif_path, 18)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 15)
    font_details_bold = ImageFont.truetype(font_serif_path, 21)
    font_details = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 16)
except Exception:
    font_title = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 50)
    font_amp = ImageFont.truetype("C:/Windows/Fonts/Gabriola.ttf", 46)
    font_kicker = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 18)
    font_badge = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 15)
    font_details_bold = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 20)
    font_details = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 16)

# 2. Base Canvas - Luxury warm ivory / champagne linen tone
canvas = Image.new("RGBA", (WIDTH, HEIGHT), (249, 246, 239, 255))

# 3. Soft Watercolor Wash from footer-wash or hero-arch
if os.path.exists("src/assets/footer-wash.jpg"):
    wash = Image.open("src/assets/footer-wash.jpg").convert("RGBA")
    wash = wash.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    r, g, b, a = wash.split()
    a = a.point(lambda p: int(p * 0.40))
    wash.putalpha(a)
    canvas.paste(wash, (0, 0), wash)
elif os.path.exists("src/assets/hero-arch.jpg"):
    arch = Image.open("src/assets/hero-arch.jpg").convert("RGBA")
    arch = arch.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    r, g, b, a = arch.split()
    a = a.point(lambda p: int(p * 0.25))
    arch.putalpha(a)
    canvas.paste(arch, (0, 0), arch)

# 4. Soft Golden Glow behind couple on the right
glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
draw_glow = ImageDraw.Draw(glow)
glow_center = (960, 315)
for radius in range(280, 40, -15):
    alpha = int((1.0 - radius / 280.0) * 95)
    draw_glow.ellipse(
        [glow_center[0] - radius, glow_center[1] - radius, glow_center[0] + radius, glow_center[1] + radius],
        fill=(226, 185, 120, alpha)
    )
glow = glow.filter(ImageFilter.GaussianBlur(30))
canvas.paste(glow, (0, 0), glow)

# 5. Add watercolor couple illustration
if os.path.exists("src/assets/couple-walking.png"):
    couple_img = Image.open("src/assets/couple-walking.png").convert("RGBA")
    # Aspect ratio preserving resize to fit height ~ 540px
    orig_w, orig_h = couple_img.size
    new_h = 540
    new_w = int(orig_w * (new_h / orig_h))
    couple_img = couple_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Soft drop shadow for couple
    shadow = Image.new("RGBA", couple_img.size, (0, 0, 0, 0))
    sh_r, sh_g, sh_b, sh_a = couple_img.split()
    sh_a = sh_a.point(lambda p: int(p * 0.22))
    shadow.putalpha(sh_a)
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))
    
    couple_x = 810
    couple_y = 65
    canvas.paste(shadow, (couple_x + 6, couple_y + 12), shadow)
    canvas.paste(couple_img, (couple_x, couple_y), couple_img)

# 6. Floral watercolor sprays in top-left & bottom-right
if os.path.exists("src/assets/floral-spray.png"):
    floral = Image.open("src/assets/floral-spray.png").convert("RGBA")
    
    # Top-left floral corner
    f_tl = floral.resize((260, 260), Image.Resampling.LANCZOS)
    r, g, b, a = f_tl.split()
    a = a.point(lambda p: int(p * 0.55))
    f_tl.putalpha(a)
    canvas.paste(f_tl, (-45, -45), f_tl)
    
    # Bottom-left subtle floral
    f_bl = floral.resize((200, 200), Image.Resampling.LANCZOS).rotate(180)
    r, g, b, a = f_bl.split()
    a = a.point(lambda p: int(p * 0.35))
    f_bl.putalpha(a)
    canvas.paste(f_bl, (640, 430), f_bl)

# 7. Watercolor lantern accent
if os.path.exists("src/assets/watercolor-lantern.png"):
    lantern = Image.open("src/assets/watercolor-lantern.png").convert("RGBA")
    lantern = lantern.resize((90, 135), Image.Resampling.LANCZOS)
    r, g, b, a = lantern.split()
    a = a.point(lambda p: int(p * 0.70))
    lantern.putalpha(a)
    canvas.paste(lantern, (680, 50), lantern)

# 8. Rings & Jasmine vignette watermark
if os.path.exists("src/assets/rings-seashell-vignette.png"):
    rings = Image.open("src/assets/rings-seashell-vignette.png").convert("RGBA")
    r_w, r_h = rings.size
    target_w = 180
    target_h = int(r_h * (target_w / r_w))
    rings = rings.resize((target_w, target_h), Image.Resampling.LANCZOS)
    r, g, b, a = rings.split()
    a = a.point(lambda p: int(p * 0.85))
    rings.putalpha(a)
    canvas.paste(rings, (535, 345), rings)

# 9. Draw Elegant Typography & Invitation Details
draw = ImageDraw.Draw(canvas)

# Left column text boundary
left_x = 75

# Kicker / Overline
draw.text((left_x, 62), "TOGETHER WITH OUR FAMILIES", font=font_kicker, fill=(160, 120, 75, 240))
# Thin golden line next to kicker
draw.line([(left_x + 295, 73), (left_x + 480, 73)], fill=(195, 150, 100, 180), width=1)

# Couple Names
name1 = "Allan Joseph Bright"
name2 = "Gladies"

draw.text((left_x, 95), name1, font=font_title, fill=(58, 42, 32, 255))
# Ampersand in script
draw.text((left_x + 10, 162), "&", font=font_amp, fill=(175, 130, 80, 255))
draw.text((left_x + 65, 160), name2, font=font_title, fill=(58, 42, 32, 255))

# Subtitle / Invitation line
draw.text((left_x, 235), "Joyfully invite you to celebrate their Holy Matrimony & Reception", font=font_details, fill=(100, 85, 75, 230))

# 10. Date & Venue Card / Block
card_box = [left_x, 280, left_x + 580, 480]
draw.rounded_rectangle(card_box, radius=12, fill=(255, 253, 248, 230), outline=(215, 175, 130, 180), width=1)

# Calendar Icon Dot & Date
draw.ellipse([left_x + 22, 306, left_x + 32, 316], fill=(185, 135, 80, 240))
draw.text((left_x + 42, 301), "Wednesday, 4 November 2026", font=font_details_bold, fill=(58, 42, 32, 255))

# Ceremonies schedule
draw.ellipse([left_x + 22, 344, left_x + 32, 354], fill=(185, 135, 80, 240))
draw.text((left_x + 42, 339), "Wedding Ceremony · 3:00 PM   |   Reception · 6:00 PM", font=font_details, fill=(75, 60, 50, 240))

# Location
draw.ellipse([left_x + 22, 382, left_x + 32, 392], fill=(185, 135, 80, 240))
draw.text((left_x + 42, 377), "CSI LITE Auditorium", font=font_details_bold, fill=(58, 42, 32, 255))
draw.text((left_x + 42, 403), "Balfour Road, Kellys, Kilpauk, Chennai - 600010", font=font_details, fill=(110, 95, 85, 230))

# 11. Bottom Badge with Domain
badge_box = [left_x, 520, left_x + 410, 566]
draw.rounded_rectangle(badge_box, radius=23, fill=(245, 238, 226, 240), outline=(200, 160, 115, 180), width=1)
# Draw geometric diamond icons
draw.regular_polygon((left_x + 35, 543, 5), 4, fill=(185, 135, 80, 240))
draw.text((left_x + 55, 532), "gladies-weds-allan.invitingyou.top", font=font_badge, fill=(75, 60, 50, 255))
draw.regular_polygon((left_x + 375, 543, 5), 4, fill=(185, 135, 80, 240))

# 12. Save to all required OG image locations as optimized JPEG
rgb_image = canvas.convert("RGB")

targets = [
    "public/og-card.jpg",
    "public/og-image.jpg",
    "public/assets/og-card.jpg",
    "public/assets/og-image.jpg",
]

for target in targets:
    os.makedirs(os.path.dirname(target), exist_ok=True)
    rgb_image.save(target, "JPEG", quality=93, optimize=True, progressive=True)
    size_kb = os.path.getsize(target) / 1024
    print(f"Saved {target} ({size_kb:.1f} KB)")

print("All Open Graph images successfully created!")
