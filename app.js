const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.static("./public"));
const bodyParser = require("body-parser");
const url = require("url");

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//BAI 1:
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.listen(3000, () => {
  console.log(`listening on http://127.0.0.1:3000`);
});
//BAI 2

//  BUOC 1
// app.get("/api/v1/todos", (req, res) => {
//   fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
//     if (err) throw err;
//     res.status(200).json(JSON.parse(data));
//   });
// });
//  BUOC 2:
app.get("/api/v1/todos/:id", (req, res) => {
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    let reqId = req.params.id;
    let findTodo = todos.find((e) => e.id == reqId);
    if (!findTodo) {
      res.status(200).json({ message: "Cannot find todo" });
    } else {
      res.status(200).json(findTodo);
    }
  });
});
//  BUOC 3:
app.post("/api/v1/todos", (req, res) => {
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    console.log(todos);
    let reqTitle = req.body.title;
    let findNewTodo = todos.find((e) => reqTitle == e.title);
    if (!findNewTodo) {
      todos.push(findNewTodo);
      console.log(todos);
      fs.writeFile(
        `${__dirname}/dev-data/todos.json`,
        JSON.stringify(todos),
        (err) => {
          if (err) throw err;
          res.status(200).json({ message: "Create successfully" });
        }
      );
    } else {
      res.status(200).json({ message: "Todo alreardy exist" });
    }
  });
});

//BUOC 4:

app.put("/api/v1/todos/:id", (req, res) => {
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    console.log(todos);
    let reqId = req.params.id;
    let findTodo = todos.find((e) => reqId == e.id);
    if (!findTodo) {
      res.status(200).json({ message: "Todo not found" });
    } else {
      let findIndex = todos.indexOf(findTodo);
      todos[findIndex] = req.body;
      fs.writeFile(`./dev-data/todos.json`, JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).json({ message: "Update successfully" });
      });
    }
  });
});

//BUOC 5:

app.delete(`/api/v1/todos/:id`, (req, res) => {
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    console.log(todos);
    let reqId = req.params.id;
    let findTodo = todos.find((e) => reqId == e.id);
    if (!findTodo) {
      res.status(200).json({ message: "Todo not found" });
    } else {
      let findIndex = todos.indexOf(findTodo);
      todos.splice(findIndex, 1);
      fs.writeFile(`./dev-data/todos.json`, JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).json({ message: "Delete successfully" });
      });
    }
  });
});

//BAI 5:

app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});

app.get("/api/v1/todos", (req, res) => {
  let queryNumber = Number(req.query.per_page);
  if (req.query.per_page) {
    fs.readFile("./dev-data/todos.json", (err, data) => {
      if (err) throw err;
      let dataJson = JSON.parse(data);
      let jsonArr = [];
      for (let i = 0; i <= queryNumber - 1; i++) {
        jsonArr.push(dataJson[i]);
      }
        res.status(200).json(jsonArr);
      res.sendFile(`${__dirname}/public/index.html`);
    });
  } else {
    fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
      if (err) throw err;
      res.status(200).json(JSON.parse(data));
    });
  }
});
