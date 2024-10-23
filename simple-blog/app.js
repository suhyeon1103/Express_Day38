const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("블로그 서버에 오신 것을 환영합니다!");
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

let posts = [];

app.get("/post", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.get("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res.status(404).json({ message: "게시글을 착을 수 없습니다." });
  }
  res.json(post);
});

app.put("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
  posts[postIndex] = { id: postId, title, content };
  res.json(posts[postIndex]);
});

app.delete("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((p) => p.id !== postId);
  res.status(204).send();
});
