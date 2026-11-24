const CACHE_NAME='tecprime-os-shell-v3';
const BASE='/Tecprime-OS/';
const SHELL=[BASE,BASE+'index.html',BASE+'manifest.webmanifest',BASE+'icons/tecprime-icon.svg',BASE+'icons/tecprime-icon-192.svg',BASE+'icons/tecprime-icon-512.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tecprime-os-shell-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 const url=new URL(event.request.url);
 const inShell=SHELL.includes(url.pathname);
 event.respondWith(fetch(event.request).then(response=>{
   if(response.ok&&(event.request.mode==='navigate'||inShell)){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));}
   return response;
 }).catch(()=>caches.match(event.request).then(cached=>cached||(event.request.mode==='navigate'?caches.match(BASE+'index.html'):undefined))));
});
