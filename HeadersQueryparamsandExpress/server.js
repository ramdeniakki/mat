const express = require('express')
const app = express();

const port = process.env.PORT || 3000;
app.get('/sum',function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
       res.json({
        answer: a + b
       })
});



app.listen(port);
