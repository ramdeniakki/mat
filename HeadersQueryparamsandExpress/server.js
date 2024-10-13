const express = require('express')
const app = express();

const port = process.env.PORT || 3000;
app.get('/',function(req,res){
    res.status(200).send("Server is working Perfectly!");
})

app.listen(port);

