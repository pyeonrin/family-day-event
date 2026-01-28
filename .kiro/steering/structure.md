# Project Structure

## Directory Organization

```
workspace-root/
├── .git/                              # Git repository
├── .kiro/                             # Kiro IDE configuration
│   ├── settings/                      # IDE settings
│   ├── specs/                         # Feature specifications
│   │   └── yongjin-market-family-day/
│   │       ├── requirements.md        # Feature requirements
│   │       ├── design.md              # Design document
│   │       └── tasks.md               # Implementation tasks
│   └── steering/                      # Development guidelines (this folder)
│       ├── product.md                 # Product overview
│       ├── tech.md                    # Technology stack
│       └── structure.md               # This file
├── .vscode/                           # VS Code settings
│
├── HTML Pages (Event & Utilities)
├── index.html                         # Main event page (scaled version)
├── yongjin-family-day.html           # Alternative event page (fixed layout)
├── memo-app.html                      # Memo/todo application
│
├── Styling & Scripts
├── style.css                          # Memo app styles
├── script.js                          # Memo app JavaScript logic
│
├── Image Assets (PNG)
├── background-sky.png                 # Sky background for event page
├── family_day_logo.png                # Family Day logo
├── year-2026.png                      # "2026" text image
├── kite.png                           # Flying kite decoration
├── bird.png                           # Bird decoration
├── plum_01.png, plum_02.png          # Plum blossom decorations
├── plum-overlay.png                   # Plum overlay effect
├── coin_icon_nobg.png                 # Coin icon (member benefit)
├── cash_icon_nobg.png                 # Cash icon (cashback benefit)
├── card_icon_nobg.png                 # Card icon (BC card benefit)
├── mo_l_family_260203.png            # Mobile detail banner
├── percentage_01.png, percetage.png  # Percentage graphics
├── 92_number.png, number.png         # Number graphics
├── figma-header-bg*.png              # Figma design backgrounds
│
├── Python Utilities (Image Processing)
├── thumbnail_generator.py             # Generate thumbnails with text
├── remove_background.py               # Remove white backgrounds
├── remove_card_bg.py                  # Remove card icon backgrounds
├── remove_cash_bg.py                  # Remove cash icon backgrounds
├── remove_family_day_bg.py           # Remove family day logo background
├── remove_modi_bg.py                  # Remove modified image backgrounds
├── remove_white_background.py         # Generic white background removal
│
├── Configuration Files
├── requirements.txt                   # Python dependencies (Pillow, NumPy)
├── vercel.json                        # Vercel deployment config
├── README.md                          # Project documentation (Korean)
└── .gitignore                         # Git ignore rules
```

## File Categories

### Event Pages
- **index.html**: Main event page with scaled layout (uses transform: scale)
- **yongjin-family-day.html**: Alternative event page with fixed positioning

### Styling
- **style.css**: Memo app styling (colorful UI, animations, responsive)

### JavaScript
- **script.js**: Memo app functionality (add/delete/filter memos, local storage)

### Assets
- **PNG Images**: Decorative elements, icons, backgrounds, logos
- **Organized by purpose**: backgrounds, icons, decorations, logos

### Utilities
- **Python Scripts**: Image processing for background removal and thumbnail generation
- **requirements.txt**: Pillow and NumPy dependencies

### Configuration
- **vercel.json**: Deployment settings for Vercel hosting
- **README.md**: Korean documentation for thumbnail generator

## Key Design Patterns

### Event Page Structure
```
Event Page
├── Full Banner Wrapper (scaled container)
│   ├── Mobile Banner Container (background image)
│   │   ├── Banner Content
│   │   │   ├── Falling Petals Animation
│   │   │   ├── Flying Kite Animation
│   │   │   ├── Decorative Elements (plums, birds, kites)
│   │   │   ├── Event Header (year, title, logo, period)
│   │   │   └── Benefits Section (3 cards)
│   │   └── Additional Banner (detail section)
```

### Responsive Breakpoints
- **Mobile**: < 768px (vertical card layout, scaled animations)
- **Desktop**: ≥ 768px (horizontal card layout, full-size animations)

### Color Scheme
- **Primary**: Sky blue (#C5E3F6, #90CAF9)
- **Accent**: Coral pink (#FF9AA2, #FF6B7A)
- **Gold**: #FFD700, #FFE55C
- **Neutral**: #2C2C2C (dark), #FFFFFF (white)

## Development Workflow

1. **Spec-Driven**: Features defined in `.kiro/specs/yongjin-market-family-day/`
2. **Static Files**: No build process needed
3. **Direct Deployment**: Push to repo → Vercel auto-deploys
4. **Image Processing**: Use Python scripts for asset preparation
5. **Testing**: Manual browser testing across target browsers

## Important Notes

- Event pages are **static HTML/CSS/JS** - no backend required
- Memo app is a **standalone utility** with local storage
- All images are **PNG format** for transparency support
- Responsive design uses **CSS media queries** (no JavaScript breakpoints)
- Animations use **CSS keyframes** for performance
- Python utilities are **optional** for asset preparation
