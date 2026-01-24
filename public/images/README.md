# Logo Guide for Wise MMDC

## Current Logo
A placeholder logo (`logo.svg`) has been created with a blue circle and "W" letter.

## How to Add Your Own Logo

### Option 1: Replace the SVG file
1. Create or design your logo
2. Export it as `logo.svg` (recommended for scalability)
3. Replace the current `logo.svg` file in this folder
4. Refresh your browser to see the changes

### Option 2: Use a PNG file
1. Create your logo as a PNG file with transparent background
2. Save it as `logo.png` in this folder
3. Update the HTML files to use `.png` instead of `.svg`:
   - Change `src="../images/logo.svg"` to `src="../images/logo.png"`
   - Do this in: `calculator.html`, `index.html`, and `article.html`

## Recommended Logo Specifications

### Size
- **Height**: 40-50px (currently set to 45px)
- **Width**: Auto (maintains aspect ratio)
- **Format**: SVG (preferred) or PNG with transparent background

### Design Tips
- Keep it simple and recognizable at small sizes
- Use colors that complement the #007bff (blue) theme
- Ensure good contrast against white background
- Test on both desktop and mobile views

### Aspect Ratios That Work Well
- Square (1:1) - like the placeholder
- Slightly wide (3:2 or 4:3)
- Horizontal (2:1) for text-based logos

### File Size
- SVG: Usually < 10KB
- PNG: Try to keep under 50KB for fast loading

## To Adjust Logo Size in CSS
Open `css/style.css` and find `.header__logo-img`:

```css
.header__logo-img {
  height: 45px;  /* Change this value */
  width: auto;
  display: block;
}
```

Increase or decrease the `height` value as needed!

