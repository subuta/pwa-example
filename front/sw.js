/*
// Borrowed from https://github.com/GoogleChrome/workbox

Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js')

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)

  workbox.precaching.precacheAndRoute([])

  workbox.routing.registerRoute(
    'https://cdn.polyfill.io/v2/polyfill.min.js',
    workbox.strategies.networkFirst()
  )

  workbox.routing.registerRoute(
    /https:\/\/picsum.photos\/(.*)/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  )

  const pagesHandler = workbox.strategies.networkFirst({
    cacheName: 'pages-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
      })
    ]
  })

  workbox.routing.registerRoute(
    /http:\/\/localhost:(3000|4000)\/pages\/(.*)/,
    args => {
      return pagesHandler.handle(args).then(async response => {
        console.log('Got response = ', response)
        if (!response) {
          return caches.match('Offline.html');
        } else if (response.status === 404) {
          return caches.match('404.html');
        }
        return response;
      });
    }
  )

} else {
  console.log(`Boo! Workbox didn't load 😬`)
}