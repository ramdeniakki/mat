
### Middlewares
In Express.js, middleware refers to functions that have access to the request object (req), response object (res), and the next function in the application's request-response cycle. Middleware functions can perform a variety of tasks, such as:

- Modifying the request or response objects.
- Ending the request-response cycle.
- Calling the next middleware function in the stack.
![Middleware Overview](/Middleware-cors/Pic1.png)
Try running this code and see if the logs come or not:

```javascript
app.use(function(req, res, next) {
    console.log("request received");
    next();
});

app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    });
});
```

#### Modifying the request:

```javascript
app.use(function(req, res, next) {
    req.name = "Harkirat";
    next();
});

app.get("/sum", function(req, res) {
    console.log(req.name);
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    });
});
```

#### Ending the request/response cycle:

```javascript
app.use(function(req, res, next) {
    res.json({
        message: "You are not allowed"
    });
});

app.get("/sum", function(req, res) {
    console.log(req.name);
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    });
});
```

#### Calling the next middleware function in the stack:

```javascript
app.use(function(req, res, next) {
    console.log("request received");
    next();
});

app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    });
});
```
```