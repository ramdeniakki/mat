const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'akki@working_2364';
const port = process.env.PORT || 3000;

const users = [];
app.use(express.json());

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    });
    res.json({
        msg: "You have successfully signed up dude!"
    });
    console.log(users)
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i];
            break; // Exit loop when user is found
        }
    }

    if (foundUser) {
        const token = jwt.sign({
            username: username,
            password: password
        }, JWT_SECRET);

        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Invalid username or password"
        });
    }
    console.log(users);
});

app.get('/get', (req, res) => {
    const token = req.headers.token;

    try {
        const decode = jwt.verify(token, JWT_SECRET);
        const username = decode.username;
        
        let foundUser = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username) {
                foundUser = users[i];
                break; // Exit loop when user is found
            }
        }

        if (foundUser) {
            res.json({
                username: foundUser.username
                // password: foundUser.password // Consider not sending the password
            });
        } else {
            res.json({
                message: "Invalid Token!"
            });
        }
    } catch (error) {
        res.status(403).json({
            message: "Invalid Token!"
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
