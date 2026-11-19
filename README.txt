MEHRA ESTATES - static website
Files: index.html, style.css, script.js (keep together). Also: 404.html, robots.txt, _headers (Netlify security and cache settings).
Deploy: Netlify (drag the folder to app.netlify.com/drop) or GitHub Pages (upload files to a repo, enable Pages).
Edit listings: open script.js and change the "props" list near the top (replace demo entries with real ones).
Edit WhatsApp number: change WA at the top of script.js.
After you get your Netlify URL or custom domain, add it to index.html: <link rel="canonical" href="https://YOUR-DOMAIN/"> and, optionally, a sitemap.xml.
Photos load from Unsplash. For best speed and reliability, save your own photos in an images/ folder and update the image links in index.html and script.js.
