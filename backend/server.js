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
    id: 1,
    content: "New post about React",
    created: "2021-10-15 12:10:00",
  },
  {
    id: 2,
    content: "Another post - about React Redux",
    created: "2021-09-03 12:10:00",
  },
  {
    id: 3,
    content: "Third post abоut React Router",
    created: "2021-08-03 12:20:00",
  },
];

let nextId = 4;

const router = new Router();

router.get("/posts/:id", async (ctx, next) => {
  const postId = Number(ctx.params.id);
  const findPost = posts.find((o) => o.id === postId);
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
  let data = JSON.parse(ctx.request.body);
  posts.push({ ...data, id: nextId++, created: Date.now() });
  ctx.response.status = 204;
});

router.put("/posts/:id", async (ctx, next) => {
  const content = JSON.parse(ctx.request.body);
  const postId = Number(ctx.params.id);
  const findpost = posts.find((o) => o.id === postId);
  const filteredPosts = posts.filter((o) => o.id !== postId);
  const editPost = { ...findpost, content };
  posts = [...filteredPosts, editPost];
  ctx.response.status = 204;
});

router.delete("/posts/:id", async (ctx, next) => {
  const postId = Number(ctx.params.id);
  const index = posts.findIndex((o) => o.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log("server started"));
