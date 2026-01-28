# Technology Stack

## Frontend

### Languages & Markup
- **HTML5**: Semantic markup for event pages
- **CSS3**: Responsive styling with media queries, animations, and flexbox/grid layouts
- **JavaScript**: Vanilla JS for interactivity (memo app)

### Frameworks & Libraries
- None required for event pages (vanilla HTML/CSS/JS)
- Memo app uses vanilla JavaScript with no external dependencies

### Key Technologies
- **Responsive Design**: CSS media queries (breakpoint: 768px)
- **CSS Animations**: Falling petals, flying kites, smooth transitions
- **Aspect Ratio**: CSS aspect-ratio property for maintaining design proportions
- **Flexbox**: Layout system for benefit cards and responsive containers

## Backend & Build

### Build System
- **No build system required** - Static HTML/CSS/JS files
- Direct file serving via HTTP

### Deployment
- **Vercel**: Configured via `vercel.json`
- Static site hosting

## Image Processing (Python)

### Purpose
Background removal and thumbnail generation utilities

### Dependencies
- **Pillow** (>=10.0.0): Image manipulation and processing
- **NumPy** (>=1.24.0): Numerical operations for image processing

### Scripts
- `thumbnail_generator.py`: Generate thumbnails with text overlays
- `remove_*.py`: Background removal utilities for various image types

## Development Environment

### File Structure
```
.
├── index.html                    # Main event page
├── yongjin-family-day.html      # Alternative event page
├── memo-app.html                # Memo/todo app
├── style.css                    # Memo app styles
├── script.js                    # Memo app logic
├── [image files]                # PNG assets (backgrounds, icons, decorations)
├── [python scripts]             # Image processing utilities
├── requirements.txt             # Python dependencies
├── vercel.json                  # Deployment config
└── .kiro/                       # Kiro workspace config
    ├── specs/                   # Feature specifications
    └── steering/                # Development guidelines
```

## Common Commands

### Image Processing
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run thumbnail generator
python thumbnail_generator.py

# Run background removal
python remove_background.py
```

### Deployment
- Push to repository → Vercel auto-deploys static files
- No build step required

### Local Development
- Open HTML files directly in browser
- Use live server for development (e.g., `python -m http.server`)

## Performance Considerations

- **Image Optimization**: PNG assets should be optimized for web
- **CSS Animations**: Use GPU-accelerated properties (transform, opacity)
- **Responsive Images**: Consider srcset for different device sizes
- **Load Time Target**: < 3 seconds on standard broadband

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Graceful degradation for older browsers
