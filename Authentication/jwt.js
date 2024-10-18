const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const jWT_SECRET = "testingjwt@jwttoken";
app.use(express.json())
const users = [];


app.post('/signup',function(req,res){
    const username = req.body.username
    const password = req.body.password

    users.push({
        username:username,
        password:password
    })
    res.json({
        msg:"Signup successfull"
    })
    console.log(users)

})

app.post('/signin', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let founduser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            founduser = users[i];
            break; // Exit loop once user is found
        }
    }
    
    if (founduser) {
        const token = jwt.sign({ username: username }, jWT_SECRET);
        res.json({ token: token });
    } else {
        res.status(401).json({ msg: "Invalid username or password" });
    }
    
    console.log(users);
});
app.get('/me', function(req, res) {
    const token = req.headers.token; // Get token from headers

    const decodedinfo = jwt.verify(token,jWT_SECRET)
    const username = decodedinfo.username;
    let founduser = null;

    // Find user by token
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            founduser = users[i];
        
        }
    }

    if (founduser) {
        res.json({
            name: founduser.username,
        password:founduser.password    // Do not expose password for security
        });
    } else {
        res.status(401).json({
            msg: "Token invalid"
        });
    }
});

app.listen(3000)