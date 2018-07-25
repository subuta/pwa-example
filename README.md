### PWA Example

Example PWA(Progressive Web Apps) built on top of following libraries.

- [koa](https://github.com/koajs/koa)
- [workbox](https://github.com/GoogleChrome/workbox)
- [taskr](https://github.com/lukeed/taskr)
- [handlebars](https://github.com/wycats/handlebars.js/)

#### Getting started

```
# Install
npm i

# Start dev-server
npm run dev

# Start application server(koa)
npm run serve
```

#### Directories

```
.
├── README.md -> This file
├── front -> All front-end assets goes here(Including sw.js of workbox)
├── pages
│   ├── index.js -> Route renderer for `/pages`
│   └── views -> Template files (handlebars)
├── public -> built files goes here.
├── server.js -> Application server(koa)
└── taskfile.js -> Task definitions(taskr)
```

#### Exploring PWA example

Visit following pages with application server started(`npm run serve`)

- `http://localhost:3000/pages/(hoge|fuga|piyo)` Example pages with image(from [Lorem Picsum](https://picsum.photos/))
- `http://localhost:3000/pages/not-exists` Not existing page.
  - will respond with `404.html` if application server is started.
  - will respond with `Offline.html` if application server is not started.

Then abort application server(by <kbd>ctrl + c</kbd>) and re-visit these pages again :)