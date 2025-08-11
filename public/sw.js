if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + '.js', c).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let n = {};
    const f = (e) => a(e, t),
      r = { module: { uri: t }, exports: n, require: f };
    s[t] = Promise.all(c.map((e) => r[e] || f(e))).then((e) => (i(...e), n));
  };
}
define(['./workbox-db63acfa'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '07812cce5ee333e00099d100405bf608',
        },
        {
          url: '/_next/static/chunks/30e5a947-c4584deda1c0dab9.js',
          revision: 'c4584deda1c0dab9',
        },
        {
          url: '/_next/static/chunks/376-806a72cd6a74a31b.js',
          revision: '806a72cd6a74a31b',
        },
        {
          url: '/_next/static/chunks/668-1737f81ca8fb043f.js',
          revision: '1737f81ca8fb043f',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-38fe93260bf77660.js',
          revision: '38fe93260bf77660',
        },
        {
          url: '/_next/static/chunks/app/layout-c2dc1213f3958ef9.js',
          revision: 'c2dc1213f3958ef9',
        },
        {
          url: '/_next/static/chunks/app/page-4268c79f7ec3950a.js',
          revision: '4268c79f7ec3950a',
        },
        {
          url: '/_next/static/chunks/framework-9406cd7dc9cebf15.js',
          revision: '9406cd7dc9cebf15',
        },
        {
          url: '/_next/static/chunks/main-13db64595aed340e.js',
          revision: '13db64595aed340e',
        },
        {
          url: '/_next/static/chunks/main-app-6e3899e12952914e.js',
          revision: '6e3899e12952914e',
        },
        {
          url: '/_next/static/chunks/pages/_app-3a6dac8216936a62.js',
          revision: '3a6dac8216936a62',
        },
        {
          url: '/_next/static/chunks/pages/_error-2b5e186f1316bf6d.js',
          revision: '2b5e186f1316bf6d',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-26039d28bbabec71.js',
          revision: '26039d28bbabec71',
        },
        {
          url: '/_next/static/css/337b98657108848c.css',
          revision: '337b98657108848c',
        },
        {
          url: '/_next/static/lZhDAciVsxUmDyYoT6Iw9/_buildManifest.js',
          revision: '435185a8baa3ad85ee7d3c8993f7cb01',
        },
        {
          url: '/_next/static/lZhDAciVsxUmDyYoT6Iw9/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/media/021bc4481ed92ece-s.woff2',
          revision: '0f5cb8880dd308345f58cecdc5fc5041',
        },
        {
          url: '/_next/static/media/2b5e8b1f085dfe05-s.p.ttf',
          revision: 'aa35956ea3fc0367fdf14ffc991d4f77',
        },
        {
          url: '/_next/static/media/3f69592b2fe603c7-s.woff2',
          revision: '84568c0a37620328592a78e9ad069d77',
        },
        {
          url: '/_next/static/media/4f05ba3a6752a328-s.p.woff2',
          revision: 'ea21cc6e4b393851204d1a3160ad6abc',
        },
        {
          url: '/_next/static/media/6325a8417175c41d-s.woff2',
          revision: 'a3fd0c427e31c0cadb48607ee8c7876b',
        },
        {
          url: '/_next/static/media/99b7f73d5af7c3e2-s.woff2',
          revision: 'e94b5e20c27aefc321077e0493d637fa',
        },
        {
          url: '/_next/static/media/ff840cfebfb63b0c-s.p.woff2',
          revision: '302ec55f5b4320354ec6b35a53dead87',
        },
        { url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        {
          url: '/icon-192x192.png',
          revision: '7554f9903365d3e71eb7c78ad09e2812',
        },
        {
          url: '/icon-512x512.png',
          revision: '8c5d1412f0ac74b537dc635dba434e8b',
        },
        { url: '/manifest.json', revision: '68263286f56ec93337e501e41e82aebb' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
        { url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https?.*/,
      new e.NetworkFirst({
        cacheName: 'offlineCache',
        plugins: [new e.ExpirationPlugin({ maxEntries: 200 })],
      }),
      'GET'
    ));
});
