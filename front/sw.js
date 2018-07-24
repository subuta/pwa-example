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
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js')

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)

  workbox.precaching.precacheAndRoute([])

  workbox.routing.registerRoute(
    'https://cdn.polyfill.io/v2/polyfill.min.js',
    workbox.strategies.networkFirst()
  )

  // workbox.routing.registerRoute(
  //   /(.*)articles(.*)\.(?:png|gif|jpg)/,
  //   workbox.strategies.cacheFirst({
  //     cacheName: 'images-cache',
  //     plugins: [
  //       new workbox.expiration.Plugin({
  //         maxEntries: 50,
  //         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
  //       })
  //     ]
  //   })
  // );

  const endpoint = 'http://localhost:3000/api/*'

  const apiHandler = workbox.strategies.networkFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
      })
    ]
  })

  workbox.routing.registerRoute(
    /http:\/\/localhost:3000\/api\/(.*)/,
    args => {
      return apiHandler.handle(args).then(async response => {
        if (!response) {
          // FIXME: Error response goes to `then` statement of fetch...
          // SEE: https://github.com/GoogleChrome/workbox/issues/1551
          return new Response('Looks like offline ;)', { status: 500, statusText: 'offline' });
        } else if (response.status === 404) {
          return new Response('Looks like offline or Page not found', { status: 404, statusText: 'notFound' });
        }
        return response;
      });
    }
  )

} else {
  console.log(`Boo! Workbox didn't load 😬`)
}