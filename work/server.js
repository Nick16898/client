const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function getPortalHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projects Hub | Kanaiya Footwear & Krishiv Hospital</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090e17;
      --card-bg: rgba(22, 31, 48, 0.7);
      --card-border: rgba(255, 255, 255, 0.1);
      --primary-cyan: #06b6d4;
      --primary-orange: #ff5e3a;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      background-image: 
        radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(255, 94, 58, 0.12) 0%, transparent 40%);
    }
    .container { max-width: 1000px; width: 100%; text-align: center; }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--primary-cyan);
      margin-bottom: 1.5rem;
    }
    .badge-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; }
    h1 {
      font-family: 'Outfit', sans-serif;
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 0.75rem;
      background: linear-gradient(135deg, #ffffff 40%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p.subtitle {
      color: var(--text-muted);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto 3rem;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      text-align: left;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 2rem;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .card:hover {
      transform: translateY(-6px);
      border-color: rgba(255, 255, 255, 0.25);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }
    .card.kanaiya { border-top: 3px solid var(--primary-orange); }
    .card.krishiv { border-top: 3px solid var(--primary-cyan); }
    .card-icon {
      font-size: 2.2rem;
      margin-bottom: 1rem;
      display: inline-block;
    }
    .card h2 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #fff;
    }
    .card p {
      color: var(--text-muted);
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }
    .card-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.95rem;
      transition: all 0.2s ease;
    }
    .btn-orange {
      background: linear-gradient(135deg, #ff5e3a, #e11d48);
      color: #fff;
    }
    .btn-orange:hover {
      opacity: 0.95;
      box-shadow: 0 8px 20px rgba(255, 94, 58, 0.35);
    }
    .btn-cyan {
      background: linear-gradient(135deg, #06b6d4, #0284c7);
      color: #fff;
    }
    .btn-cyan:hover {
      opacity: 0.95;
      box-shadow: 0 8px 20px rgba(6, 182, 212, 0.35);
    }
    footer {
      margin-top: 3.5rem;
      color: #64748b;
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">
      <span class="badge-dot"></span>
      <span>Projects Hub • Live Server Ready</span>
    </div>
    <h1>Select a Project</h1>
    <p class="subtitle">Both websites are served seamlessly with shared assets and Render-ready routing.</p>
    
    <div class="projects-grid">
      <!-- Kanaiya Footwear -->
      <div class="card kanaiya">
        <div>
          <div class="card-icon">👟</div>
          <h2>Kanaiya Footwear</h2>
          <p>Premium footwear showroom in Manavadar, Gujarat. Features sports sneakers, handcrafted leather sandals, ortho relief footwear, and interactive Instagram reels.</p>
        </div>
        <a href="/kanaiya-footwear/" class="card-btn btn-orange">
          Launch Kanaiya Footwear &rarr;
        </a>
      </div>

      <!-- Krishiv Hospital -->
      <div class="card krishiv">
        <div>
          <div class="card-icon">🏥</div>
          <h2>Krishiv Hospital & I.C.U</h2>
          <p>Super-specialty critical care and intensive care hospital in Junagadh, led by Dr. Pinank Mer (M.D. Physician). Features live ECG simulation and appointment booking.</p>
        </div>
        <a href="/krishiv-hospital/" class="card-btn btn-cyan">
          Launch Krishiv Hospital &rarr;
        </a>
      </div>
    </div>

    <footer>
      Server running on port ${PORT} &bull; Assets routed from /assets/
    </footer>
  </div>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let reqPath = decodeURIComponent(parsedUrl.pathname);

  // Normalize path using POSIX forward slashes for clean matching
  let normalizedPath = reqPath.replace(/\\/g, '/');

  // 1. Root route -> Landing Portal
  if (normalizedPath === '/' || normalizedPath === '') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(getPortalHtml());
  }

  // 2. Redirect folder shortcuts without trailing slash (e.g. /kanaiya-footwear -> /kanaiya-footwear/)
  if (normalizedPath === '/kanaiya-footwear') {
    res.writeHead(301, { Location: '/kanaiya-footwear/' });
    return res.end();
  }
  if (normalizedPath === '/krishiv-hospital') {
    res.writeHead(301, { Location: '/krishiv-hospital/' });
    return res.end();
  }

  // 3. Resolve target file on disk
  const relativeFilePath = normalizedPath.replace(/^\/+/, '');
  let filePath = path.join(__dirname, relativeFilePath);

  // Handle directory requests by serving index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Fallback: If asset requested directly from /assets/ without project prefix
  if (!fs.existsSync(filePath) && normalizedPath.startsWith('/assets/')) {
    const filename = path.basename(normalizedPath);
    const candidate1 = path.join(__dirname, 'assets', 'kanaiya-footwear', filename);
    const candidate2 = path.join(__dirname, 'assets', 'krishiv-hospital', filename);
    if (fs.existsSync(candidate1)) filePath = candidate1;
    else if (fs.existsSync(candidate2)) filePath = candidate2;
  }

  // Fallback for legacy /photos/... requests
  if (!fs.existsSync(filePath) && normalizedPath.startsWith('/photos/')) {
    const filename = normalizedPath.replace('/photos/', '');
    const candidate = path.join(__dirname, 'assets', 'kanaiya-footwear', filename);
    if (fs.existsSync(candidate)) filePath = candidate;
  }

  // Ensure resolved file is within workspace
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  // Check existence and serve
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(`<!DOCTYPE html>
<html>
<head><title>404 Not Found</title></head>
<body style="font-family: sans-serif; text-align: center; padding: 50px; background: #0b1120; color: #f8fafc;">
  <h1>404 - Page or Asset Not Found</h1>
  <p style="color: #94a3b8;">The requested path <code>${normalizedPath}</code> was not found on this server.</p>
  <p><a href="/" style="color: #06b6d4;">&larr; Back to Projects Hub</a></p>
</body>
</html>`);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`- Kanaiya Footwear: http://localhost:${PORT}/kanaiya-footwear/`);
  console.log(`- Krishiv Hospital: http://localhost:${PORT}/krishiv-hospital/`);
  console.log(`- Assets: http://localhost:${PORT}/assets/`);
});
