const express = require('express')
const app = express();

// let requestcount = 0;

// const bodyparser = require('body-parser')
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.post('/sum',function(req,res){

    // requestcount = requestcount+1;
    // console.log(`request count  + ${requestcount}`);

    const a = parseInt(req.body.a)
    const b = parseInt(req.body.b);
res.json({
    ans: a+b
})
})

app.listen(3000)