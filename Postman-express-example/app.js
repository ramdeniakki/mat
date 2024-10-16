const express = require('express')
const app = express();
 // creating user memory


 app.use(express.json())
 const users = [{
    name:'john',
    kidneys:[{
        healthy:false
    }]
 }]

 app.get('/',function(req,res){
    const Johnkidney = users[0].kidneys;
    // console.log(Johnkidney);

    // number of kidneys 

    const numberofkidneys = Johnkidney.length;
    // console.log(numberofkidneys);

    // number of healthy kidneys 
    let numberofhealthykidney = 0;
    for( let i =0;i<Johnkidney.length;i++){
        if(Johnkidney[i].healthy){
            numberofhealthykidney = numberofhealthykidney + 1;
        }
    }
    const numberofunhealthykidney = numberofkidneys - numberofhealthykidney;
    res.json({
        numberofkidneys,
        numberofhealthykidney,
        numberofunhealthykidney
    })
 })

 app.post('/',(req,res)=>{
    const ishealthy = req.body.ishealthy;
    users[0].kidneys.push({
        healthy: ishealthy
    })
    res.json({
        msg:"done!"
    })
 })


 app.put('/',function(req,res){
    for(let i =0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({})
 })

 app.delete('/',function(req,res){
    const newkidneys = []
    for(let i =0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newkidneys.push({
                healthy:true
            })
        }users[0].kidneys = newkidneys;
        res.json({msg:"done"})
    }
 })
 
 app.listen(3000);