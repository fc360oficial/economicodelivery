// SW Econômico Express
self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);

  // Quando o PWA tenta navegar para /admin/, intercepta e mostra tela de saída
  if (e.request.mode === 'navigate' && url.pathname.includes('/admin') && url.searchParams.get('direct') !== '1') {
    var adminUrl = url.href.split('?')[0]; // URL limpa sem params
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
      + 'p{font-size:14px;color:#aaa;margin-bottom:24px;line-height:1.5}'
      + '.url-box{display:flex;align-items:center;width:100%;max-width:320px;'
      + 'background:#1a1a1a;border:1px solid #333;border-radius:10px;'
      + 'overflow:hidden;margin-bottom:24px}'
      + '.url-box input{flex:1;background:none;border:none;color:#aaa;'
      + 'font-size:11px;padding:10px 12px;outline:none}'
      + '.url-box button{background:#333;color:#fff;border:none;'
      + 'padding:10px 14px;font-size:12px;cursor:pointer;white-space:nowrap}'
      + '.btn-y{display:block;width:100%;max-width:280px;padding:14px;'
      + 'background:#FFC600;color:#1a1a1a;border:none;border-radius:12px;'
      + 'font-size:15px;font-weight:800;text-decoration:none;margin-bottom:12px;cursor:pointer}'
      + '.btn-out{display:block;width:100%;max-width:280px;padding:12px;'
      + 'background:none;color:#aaa;border:1px solid #333;border-radius:12px;'
      + 'font-size:14px;font-weight:600;cursor:pointer;text-decoration:none}'
      + '.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);'
      + 'background:#22c55e;color:#fff;padding:8px 20px;border-radius:20px;'
      + 'font-size:13px;display:none}'
      + '</style></head><body>'
      + '<div class="icon">🔐</div>'
      + '<h2>Painel Admin</h2>'
      + '<p>Abra o link abaixo no<br>navegador do celular:</p>'
      + '<div class="url-box">'
      + '  <input id="urlInput" value="' + adminUrl + '" readonly>'
      + '  <button onclick="copiar()">Copiar</button>'
      + '</div>'
      + '<button class="btn-y" onclick="compartilhar()">Compartilhar link ↗</button>'
      + '<a href="#" onclick="history.back();return false;" class="btn-out">← Voltar ao App</a>'
      + '<div class="toast" id="toast">Link copiado!</div>'
      + '<script>'
      + 'var _u="' + adminUrl + '";'
      + 'function compartilhar(){'
      + '  if(navigator.share){navigator.share({title:"Painel Admin",url:_u});}'
      + '  else{copiar();}'
      + '}'
      + 'function copiar(){'
      + '  try{'
      + '    navigator.clipboard.writeText(_u).then(function(){showToast();});'
      + '  }catch(e){'
      + '    var el=document.getElementById("urlInput");el.select();document.execCommand("copy");showToast();'
      + '  }'
      + '}'
      + 'function showToast(){'
      + '  var t=document.getElementById("toast");t.style.display="block";'
      + '  setTimeout(function(){t.style.display="none";},2000);'
      + '}'
      + '<\/script>'
      + '</body></html>';

    e.respondWith(new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    }));
    return;
  }

  e.respondWith(fetch(e.request));
});
