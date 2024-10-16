const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

function isoldenoughtmiddle(req,res,next){
    const age = req.query.age;
    if(age>=14){
        next();

    }else{
        res.json({
            msg:"Sorry you are not age yet to ride"
        })
    }
}


app.use(isoldenoughtmiddle)


app.get('/ride1',function(req,res){
    res.json({
        msg:"You have Successfull ride the ride1"
    })
})

app.get('/ride2',function(req,res){
    res.json({
        msg:"You have Successfull ride the ride2"
    })
})

app.get('/ride3',function(req,res){
    res.json({
        msg:"You have Successfull ride the ride3"
    })
})

app.get('/ride4',function(req,res){
    res.json({
        msg:"You have Successfull ride the ride4"
    })
})


app.listen(port);