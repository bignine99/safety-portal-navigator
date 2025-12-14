// Service Worker to patch HTML on the fly: remove target="_blank" and add a home button
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const accept = request.headers.get('accept') || '';
  if (!accept.includes('text/html')) return;

  event.respondWith(handleHtml(request));
});

async function handleHtml(request) {
  const response = await fetch(request);
  // If fetch failed or non-OK, just return it.
  if (!response || !response.ok) return response;

  const cloned = response.clone();
  const text = await cloned.text();
  const patched = patchHtml(text);

  // Copy headers except content-length (will be wrong after patching)
  const newHeaders = new Headers(response.headers);
  newHeaders.delete('content-length');
  newHeaders.set('content-type', 'text/html; charset=utf-8');

  return new Response(patched, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

function patchHtml(html) {
  let out = html.replace(/target="_blank"/gi, '');

  const homeButtonScript = `<script>(function(){try{const p=(location.pathname||'').toLowerCase();if(p.endsWith('/')||p.endsWith('/index.html'))return;const b=document.createElement('a');b.href='./index.html';b.textContent='홈으로 가기';Object.assign(b.style,{position:'fixed',left:'50%',transform:'translateX(-50%)',bottom:'24px',padding:'10px 18px',background:'#2563eb',color:'#fff',borderRadius:'10px',boxShadow:'0 6px 12px rgba(0,0,0,0.18)',textDecoration:'none',fontWeight:'700',zIndex:'9999'});document.body.appendChild(b);}catch(e){console.error(e);}})();</script></body>`;
  if (out.match(/<\/body>/i)) {
    out = out.replace(/<\/body>/i, homeButtonScript);
  } else {
    out += homeButtonScript.replace('</body>', '');
  }

  return out;
}

