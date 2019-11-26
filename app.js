const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const app = new Koa();

let routec = (ctx) => {
  if (/^\/login\.html/.test(ctx.path)) {
    ctx.body = `<!doctype html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <title>登录</title>
        <link rel="stylesheet" href="/assets/login.css" />
      </head>
      <body>
      <script src="/assets/lib/react.js"></script>
      <script src="/assets/lib/react-dom.js"></script>
      <script src="/assets/lib/axios.js"></script>
      <script src="/assets/login.js"></script>
      </body>
      </html>`
  } else if (/^\/test\.html/.test(ctx.path)) {
    ctx.body = `<!doctype html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <title>test</title>
        <link rel="stylesheet" href="/assets/faq.css" />
      </head>
      <body>
      <script src="/assets/lib/react.js"></script>
      <script src="/assets/lib/react-dom.js"></script>
      <script src="/assets/test.js"></script>
      </body>
      </html>`
  } else {
    ctx.body= `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <title>no such path:${ctx.path}</title>
      </head>
      <body>
      <H1>no such path:${ctx.path}， pleaase confirm your path</H1>
      </body>
      </html>`
  }
}

app.use(koaStatic(path.resolve('.')));
app.use(routec);
app.listen(80);
console.log('80 port');
