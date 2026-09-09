const http = require('http');
const fs = require('fs');
const path = require('path');

// 1. Automatically load .env file if present
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
    console.log('Loaded environment variables from .env');
  } catch (err) {
    console.warn('Could not parse .env file:', err.message);
  }
}

const PORT = process.env.PORT || 3000;
const PORTAL_PASSWORD = process.env.PORTAL_PASSWORD || '2026';

const PROJECTS_DATA = [
  {
    id: 'kanaiya-footwear-letest',
    title: 'Kanaiya Footwear (Latest Edition)',
    icon: '👟',
    badgeClass: 'kanaiya-badge',
    btnClass: 'btn-kanaiya',
    desc: 'Hyper-modern sneaker showcase with 3D product view, interactive colorway selector, exploded sole anatomy, and Instagram reels.',
    tags: ['Sneakers & Sports', '3D Interactive View', 'Instagram Reels', 'Latest Edition'],
    url: '/kanaiya-footwear-letest/'
  },
  {
    id: 'kanaiya-website',
    title: 'Kanaiya Footwear (Classic Theme)',
    icon: '👞',
    badgeClass: 'kanaiya-badge',
    btnClass: 'btn-kanaiya',
    desc: 'Traditional boutique footwear catalog featuring handcrafted leather sandals, formal wear, ortho slippers, and reel showcase.',
    tags: ['Traditional & Formal', 'Handcrafted Sandals', 'Instagram Reels', 'Classic Theme'],
    url: '/kanaiya-website/'
  },
  {
    id: 'krishiv-hospital',
    title: 'Krishiv Hospital & I.C.U',
    icon: '🏥',
    badgeClass: 'krishiv-badge',
    btnClass: 'btn-krishiv',
    desc: 'Super-specialty critical care & intensive care hospital in Junagadh, led by Dr. Pinank Mer (M.D. Physician). Features live ECG simulation waveform and appointment booking.',
    tags: ['Healthcare', 'ICU Speciality', 'Live ECG Simulation', 'WhatsApp Consult'],
    url: '/krishiv-hospital/'
  }
];

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

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let reqPath = decodeURIComponent(parsedUrl.pathname);

  // Normalize path using POSIX forward slashes for clean matching
  let normalizedPath = reqPath.replace(/\\/g, '/');

  // 1. API: Passcode Verification Endpoint (reads password from .env / process.env)
  if (normalizedPath === '/api/verify-passcode' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e4) req.destroy(); // Protect against oversized payloads
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const submittedCode = (data.passcode || '').toString().trim();
        const expectedCode = (process.env.PORTAL_PASSWORD || PORTAL_PASSWORD).toString().trim();

        if (submittedCode && submittedCode === expectedCode) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            success: true,
            projects: PROJECTS_DATA
          }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            success: false,
            error: 'Invalid passcode'
          }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ success: false, error: 'Malformed JSON' }));
      }
    });
    return;
  }

  // 2. Root route -> Serve protected index.html
  if (normalizedPath === '/' || normalizedPath === '') {
    normalizedPath = '/index.html';
  }

  // 3. Redirect folder shortcuts without trailing slash
  if (normalizedPath === '/kanaiya-footwear-letest') {
    res.writeHead(301, { Location: '/kanaiya-footwear-letest/' });
    return res.end();
  }
  if (normalizedPath === '/kanaiya-website') {
    res.writeHead(301, { Location: '/kanaiya-website/' });
    return res.end();
  }
  if (normalizedPath === '/krishiv-hospital') {
    res.writeHead(301, { Location: '/krishiv-hospital/' });
    return res.end();
  }
  // Legacy aliases for /kanaiya-footwear
  if (normalizedPath === '/kanaiya-footwear' || normalizedPath === '/kanaiya-footwear/') {
    res.writeHead(301, { Location: '/kanaiya-footwear-letest/' });
    return res.end();
  }

  // 4. Resolve target file on disk
  const relativeFilePath = normalizedPath.replace(/^\/+/, '');
  let filePath = path.join(__dirname, relativeFilePath);

  // Handle directory requests by serving index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Fallback: If asset requested directly from /assets/ without project prefix
  if (!fs.existsSync(filePath) && normalizedPath.startsWith('/assets/')) {
    const filename = path.basename(normalizedPath);
    const candidate1 = path.join(__dirname, 'assets', 'kanaiya-footwear-letest', filename);
    const candidate2 = path.join(__dirname, 'assets', 'kanaiya-website', filename);
    const candidate3 = path.join(__dirname, 'assets', 'krishiv-hospital', filename);
    if (fs.existsSync(candidate1)) filePath = candidate1;
    else if (fs.existsSync(candidate2)) filePath = candidate2;
    else if (fs.existsSync(candidate3)) filePath = candidate3;
  }

  // Fallback for legacy /photos/... requests
  if (!fs.existsSync(filePath) && normalizedPath.startsWith('/photos/')) {
    const filename = normalizedPath.replace('/photos/', '');
    const candidate = path.join(__dirname, 'assets', 'kanaiya-footwear-letest', filename);
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
<body style="font-family: sans-serif; text-align: center; padding: 50px; background: #070b14; color: #f8fafc;">
  <h1>404 - Page or Asset Not Found</h1>
  <p style="color: #94a3b8;">The requested path <code>${normalizedPath}</code> was not found on this server.</p>
  <p><a href="/" style="color: #38bdf8; text-decoration: none;">&larr; Back to Protected Portal</a></p>
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
  console.log(`- Protected Hub (/): http://localhost:${PORT}/`);
  console.log(`- Kanaiya Footwear (Latest): http://localhost:${PORT}/kanaiya-footwear-letest/`);
  console.log(`- Kanaiya Footwear (Classic): http://localhost:${PORT}/kanaiya-website/`);
  console.log(`- Krishiv Hospital: http://localhost:${PORT}/krishiv-hospital/`);
  console.log(`- Assets: http://localhost:${PORT}/assets/`);
});
