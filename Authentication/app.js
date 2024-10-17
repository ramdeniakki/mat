const express = require('express');
const app = express();

app.use(express.json());

const users = [];

function generatetoken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post('/signup', function (req, res) {
    const name = req.body.name;
    const password = req.body.password;
    users.push({
        name: name,
        password: password
    });
    res.json({
        msg: "You are signed in"
    });
    console.log(users);
});

app.post('/signin', function (req, res) {
    const name = req.body.name;
    const password = req.body.password;

    let founduser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].name === name && users[i].password === password) {
            founduser = users[i];
        }
    }

    if (founduser) {
        const token = generatetoken();
        founduser.token = token;
        res.json({
            token: token
        });
    } else {
        res.status(404).json({
            msg: "Error: User not found or incorrect credentials"
        });
    }console.log(users)
});

app.post('/me', function(req, res) {
    const token = req.headers.token; // Get token from headers
    let founduser = null;

    // Find user by token
    for (let i = 0; i < users.length; i++) {
        if (users[i].token === token) {
            founduser = users[i];
            break; // Exit loop once found
        }
    }

    if (founduser) {
        res.json({
            name: founduser.name,
            // Do not expose password for security
        });
    } else {
        res.status(401).json({
            msg: "Token invalid"
        });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
