const http = require("http");
const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const koaBody = require("koa-body");

const app = new Koa();

app.use(cors());
app.use(koaBody({ json: true }));

let posts = [
  {
    id: "1",
    content: "Новый пост о React",
  },
  {
    id: "2",
    content: "Новый пост о React Redux",
  },
  {
    id: "3",
    content: "Новый пост о React Router",
  },
];

const router = new Router();

router.get("/posts/:id", async (ctx, next) => {
  const { id } = ctx.params;
  const findPost = posts.find((o) => o.id === id);
  if (findPost) {
    ctx.response.body = findPost;
  } else {
    ctx.response.status = 404;
  }
});

router.get("/posts", async (ctx, next) => {
  ctx.response.body = posts;
});

router.post("/posts", async (ctx, next) => {
  posts.push({ ...ctx.request.body, created: Date.now() });
  ctx.response.status = 204;
});

router.put("/posts/:id", async (ctx, next) => {
  const findpost = posts.find((o) => o.id === ctx.params.id);
  const filteredPosts = posts.filter((o) => o.id !== ctx.params.id);
  const editPost = { ...findpost, content: ctx.request.body.content };
  posts = [...filteredPosts, editPost];
  ctx.response.status = 204;
});

router.delete("/posts/:id", async (ctx, next) => {
  const index = posts.findIndex((o) => o.id === ctx.params.id);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log("server started"));
