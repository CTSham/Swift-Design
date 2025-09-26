# Swift Design — Website

A responsive, single-page website with my portfolio for Corey Shamburger (Swift Design). Built with HTML, CSS (Bootstrap), and JavaScript, with optional PHP backend for the contact form.

## Features
- Smooth scrolling navigation and sticky header
- Animated headline and WOW.js animations
- Portfolio popups (Magnific Popup)
- Carousels (Owl Carousel) and counters
- Contact form with validation (Bootstrap Validator) and optional PHP email handler
- Performance tweaks (image preload and high fetch priority)

## Tech Stack
- HTML5, CSS3, JavaScript (jQuery)
- Bootstrap 3
- Plugins: Magnific Popup, Owl Carousel, Waypoints + CounterUp, WOW.js, YTPlayer
- Optional backend: PHP (`contact.php`)

## Structure
```
Swift-Design-3/
├── index.html
├── contact.php
├── thank-you.html
├── css/
├── js/
├── images/
└── fonts/
```

## Getting Started
### Quick preview (no backend)
- Open `index.html` directly in your browser.

### Local server (recommended for assets and PHP)
- PHP built-in server (serves `contact.php`):
  ```sh
  php -S 127.0.0.1:8000
  ```
  Then visit http://127.0.0.1:8000/

## Contact Form Options
Choose one approach:
1. PHP backend (current):
   - Form posts to `contact.php` via AJAX (`js/contact.js`).
   - Requires a host with PHP and `mail()` configured.
2. Mailto (simple):
   - Set form `action="mailto:hello@codebycorey.dev"`.
   - Opens the user’s email client; not reliable for all users.
3. Static host services (no-code):
   - Netlify Forms or Formspree. Example (Netlify):
     ```html
     <form name="contact" method="POST" data-netlify="true">
       <input type="text" name="name" required>
       <input type="email" name="email" required>
       <textarea name="message" required></textarea>
       <button type="submit">Send</button>
     </form>
     ```

## Deployment
- GitHub Pages: works for the static site only (PHP won’t run). Use mailto or a form service.
- Netlify/Vercel: ideal for static; pair with a form service or serverless function.
- PHP hosting (cPanel/Render): use `contact.php` directly.

## Performance Notes
- About image is preloaded and marked `fetchpriority="high"` to avoid perceived delays.
- Preloader overlay removed to show content immediately.

## Troubleshooting
- Image not showing: verify path and filename case (e.g., `images/about/IMG_0082.jpg`). Try opening the image URL directly.
- Contact form not sending: if using PHP, ensure your server allows `mail()`; check server error logs.
- Popup/carosuel issues: confirm all plugin JS/CSS files are included in `index.html` in the correct order.

## License
This repository’s content is provided as-is for portfolio use by its owner.
