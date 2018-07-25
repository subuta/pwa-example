// SEE: https://github.com/lukeed/taskr
import workbox from 'workbox-build'
import bs from 'browser-sync'

// SEE: https://github.com/lukeed/fly-kit-web/blob/master/flyfile.js
const reload = () => isWatch && isServer && bs.reload()

let isWatch = 0
let isServer = 0

const src = {
  pages: 'pages/**/*',
  copy: [
    'front/**/*'
  ]
}

const dist = 'public'

export async function copies (task) {
  await task.source(src.copy).target(dist)
}

// SEE: https://developers.google.com/web/tools/workbox/guides/generate-service-worker/workbox-build
export async function injectManifest (task) {
  const swSrc = 'front/sw.js';
  const swDest = 'public/sw.js';

  await workbox.injectManifest({
    swSrc,
    swDest,
    globDirectory: dist,
    globPatterns: [
      '**/*.{js,png,html,css}'
    ],
    globIgnores: ['index.html']
  }).then(({count, size}) => {
    task.$.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
  })
}

export async function build (task) {
  await task.clear([dist])
  await task.serial(['copies', 'injectManifest'])
  reload()
}

export async function serve (task) {
  isServer = true
  bs({
    port: 4000,
    proxy: 'localhost:3000'
  })
}

export default async function (task) {
  isWatch = true
  await task.start('build')
  await task.watch([src.copy, src.pages], 'build')
  await task.start('serve')
}