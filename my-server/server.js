//const express = require('express')
import express, { text } from 'express';
import cars from './database/cars.js';
import videos from './database/videos.js';

const app = express()

app.get("/api/cars/", (req,res) =>{
    const short = req.query.short !== undefined;
    let output;
    if(short){
        output= cars.map(({desc,photos, ...rest})=> ({
        ...rest,
        photos: photos?[photos[0]]:[]
    }));
    }else{
        output=cars;
    }
    
    res.json(output);
})

app.get("/api/cars/:id", (req,res) =>{
    const carIn = parseInt(req.params.id);
    if(carIn >=0 && carIn<cars.length){
            res.json(cars[carIn]);
    }else{
        res.status(404).json({ error: 'Car not found' , carIn});
    }
} )
app.get("/api/statistical", (req,res)=>{
    const totalCars= cars.length;
    res.json(totalCars);
} )
app.get("/api/videos", (req,res)=>{
    res.json(videos);
} )
 
let maxId=2;// this means the array will hold 3 items
            //thus leaderboard will hold 3 best scores

            let leaderboard1mode=[
                {user:"winner1", score:5},
                {user:"mid1",score:3},
                {user:"looser1",score:1}
            ]
            let leaderboard2mode=[
                {user:"winner2", score:20},
                {user:"mid2", score:100},
                {user:"looser2", score:500}
            ]

    function isValidData({user="default", score=-5, mode=1, cheated=1}={}){
        //console.log(user ,score, mode, cheated);
        if(Boolean(Number(cheated))){return false}
        switch (mode){
            case 1:
                if(score<5 && score>=0){return true}
                break;
            case 2:
                if(score>=0){return true}
                break;
            default:
                console.error("unknown mode recieved: "+ mode);
                return false;
        }
        return false;
    }

    function handleValidData(incoming){
        if(incoming.mode===1){
            let lowestScore=leaderboard1mode[maxId].score
            if(lowestScore<=incoming.score){
                let popAtIndex=leaderboard1mode.findIndex(obj => obj.score <= lowestScore);
                leaderboard1mode.pop(popAtIndex);
                incoming=Object.assign(incoming)
                delete incoming.cheated;
                delete incoming.mode;
                leaderboard1mode.push(incoming);
                leaderboard1mode.sort((a,b)=>b.score-a.score)
                console.log(leaderboard1mode)
            }
        }else if(incoming.mode===2){ 
            let lowestScore=leaderboard2mode[maxId].score
            if(lowestScore>=incoming.score){
                leaderboard2mode.pop(maxId);
                incoming=Object.assign(incoming)
                delete incoming.cheated;
                delete incoming.mode;
                leaderboard2mode.push(incoming)
                leaderboard2mode.sort((a,b)=>a.score-b.score)
                console.log(leaderboard2mode)
            }
        }else{
            console.error("invalid mode selected: ", incoming.mode)
        }
    }

app.post("/api/submit-score",(req,res)=>{
    let typeObject=false;
    let data={user:"default", score:-5, mode:0, cheated:1};
    if(typeof(req.query)==="object"){
        typeObject=true;
        data.user=String(req.query.user);
        data.score=Number(req.query.score);
        data.mode=Number(req.query.mode);
        data.cheated=Boolean(Number(req.query.cheated));
    }
    //console.log(typeObject);
    if(typeObject && isValidData(data)){
        handleValidData(data)
        res.send("Post recieved and valid!")
    }else{
        res.send("Post recieved invalid!")
    }
    
})

app.listen(4000, ()=>{console.log("listening on port 4000")})