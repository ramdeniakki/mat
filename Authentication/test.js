const express = require('express')
const app  = express();
const port = process.env.PORT || 3000;

const users = []

app.use(express.json())

function generatetoken(){
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let token = ""
   
    for(let i =0;i<32;i++){
        token+= options[Math.floor(Math.random() * options.length)]
    }
    return token;
}

app.post('/signup',function(req,res){
    const username = req.body.username
    const password = req.body.password

    users.push({
        username:username,
        password:password
    })
    res.json({
        msg:"You are Signed in"
    })
console.log(users)

})


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
    const username = req.body.username;
    const password = req.body.password;

    let founduser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
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

app.post('/me',function(req,res){
    const token= req.headers.token;
    let founduser = null;

    for(let i =0; i<users.length;i++){
        if(users[i].token === token){
            founduser = users[i]
        }
    }
    if(founduser){
        res.json({
            username:founduser.username,
            password:founduser.password
        })
    }

})

app.listen(port);