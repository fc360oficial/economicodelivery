// SW Econômico Express
self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);

  // Quando o PWA tenta navegar para /admin/, intercepta e mostra tela de saída
  if (e.request.mode === 'navigate' && url.pathname.includes('/admin')) {
    var adminUrl = url.href;
    var html = '<!DOCTYPE html><html><head><meta charset="utf-8">'
      + '<meta name="viewport" content="width=device-width,initial-scale=1">'
      + '<title>Painel Admin</title>'
      + '<style>'
      + '*{box-sizing:border-box;margin:0;padding:0}'
      + 'body{font-family:Arial,sans-serif;background:#0d0d0d;color:#fff;'
      + 'min-height:100vh;display:flex;flex-direction:column;align-items:center;'
      + 'justify-content:center;padding:32px;text-align:center}'
      + '.icon{font-size:56px;margin-bottom:16px}'
      + 'h2{font-size:20px;font-weight:900;margin-bottom:8px}'
      + 'p{font-size:14px;color:#aaa;margin-bottom:32px;line-height:1.5}'
      + '.btn-y{display:block;width:100%;max-width:280px;padding:14px;'
      + 'background:#FFC600;color:#1a1a1a;border:none;border-radius:12px;'
      + 'font-size:15px;font-weight:800;text-decoration:none;margin-bottom:12px}'
      + '.btn-out{display:block;width:100%;max-width:280px;padding:12px;'
      + 'background:none;color:#aaa;border:1px solid #333;border-radius:12px;'
      + 'font-size:14px;font-weight:600;cursor:pointer;text-decoration:none}'
      + '</style></head><body>'
      + '<div class="icon">🔐</div>'
      + '<h2>Painel Admin</h2>'
      + '<p>O painel precisa ser aberto<br>no navegador do celular.</p>'
      + '<a href="' + adminUrl + '" target="_blank" class="btn-y">Abrir Admin →</a>'
      + '<a href="/" onclick="history.back();return false;" class="btn-out">← Voltar ao App</a>'
      + '</body></html>';

    e.respondWith(new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    }));
    return;
  }

  e.respondWith(fetch(e.request));
});
