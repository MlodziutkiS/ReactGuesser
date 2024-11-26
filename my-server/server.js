//const express = require('express')
import express, { json, text } from 'express';
import cars from './database/cars.js';
import videos from './database/videos.js';
import bodyParser from 'body-parser';
import process from 'node:process';
import fs from 'fs';
import { error } from 'node:console';

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
            let output=cars[carIn];
            output.photos.shift();
            res.json(output);
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
 
let maxId=9;// as length of board array

        // in case no data read fallback values

        let leaderboard1mode=[
            { user: 'Zygzak Makłin', score: 5 },
            { user: 'Heel toe', score: 4 },
            { user: 'B1Szybki', score: 4 },
            { user: 'Sprzedam Opla', score: 4 },
            { user: 'Poldek Karo', score: 3 },
            { user: 'Alnafalbeta', score: 3 },
            { user: 'Golfiarz', score: 2 },
            { user: 'Kubalonka', score: 2 },
            { user: 'Hondziarz', score: 2 },
            { user: 'Salmopol #1', score: 1 }
        ]
        let leaderboard2mode=[
            {user: "Pan Janusz", score: 400},
            {user: "Sklep z oscypkami", score: 2200},
            {user: "CEO of KJS czeremcha", score: 3400},
            {user: "Auto Komis Mońki", score: 3800},
            {user: "Laki Strajk", score: 4100},
            {user: "Akrobata", score: 4300},
            {user: "Money shift", score: 4500},
            {user: "LPG", score: 4600},
            {user: "Win Gaz", score: 4800},
            {user: "B5 passat", score: 25000}
        ]

    try{
        const readLead1=fs.readFileSync('./database/leader1.json', 'utf8');
        let leaderboard1mode=JSON.parse(readLead1);
        const readLead2=fs.readFileSync('./database/leader2.json', 'utf8');
        let leaderboard2mode=JSON.parse(readLead2);
    }catch(err){
        console.log("error reading data: ", err);
        console.log("leaderboard1mode value:", leaderboard1mode,"leaderboard2mode value:", leaderboard2mode);
    }

    function isValidData({user="default", score=-5, mode=1, cheated=1}={}){
        if(cheated){return false}
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
            // adding new score to the table, make new scores push out old ones
        if(incoming.mode===1){
            let lowestScore=leaderboard1mode[maxId].score
            if(lowestScore<=incoming.score){
                let popAtIndex=leaderboard1mode.findIndex(obj => obj.score <= lowestScore);
                leaderboard1mode.pop(popAtIndex);
                delete incoming.cheated;
                delete incoming.mode;
                leaderboard1mode.splice(popAtIndex,0,incoming);
                leaderboard1mode.sort((a,b)=>b.score-a.score)
                console.log(leaderboard1mode)
            }
        }else if(incoming.mode===2){ 
            let lowestScore=leaderboard2mode[maxId].score
            if(lowestScore>=incoming.score){
                let popAtIndex=leaderboard2mode.findIndex(obj => obj.score <= lowestScore);
                leaderboard2mode.pop(popAtIndex);
                delete incoming.cheated;
                delete incoming.mode;
                leaderboard2mode.splice(popAtIndex,0,incoming);
                leaderboard2mode.sort((a,b)=>a.score-b.score)
                console.log(leaderboard2mode)
            }
        }else{
            console.error("invalid mode selected: ", incoming.mode)
        }
    }

    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.use(bodyParser.json())

app.post("/api/submit-score",urlencodedParser,(req,res)=>{
    let data={user:"default", score:-5, mode:0, cheated:1};
        // this code needs some improvement
        let request=req.body;
        data.user=String(request.user);
        data.user= data.user.trim().slice(0,20);
        data.score=Number(request.score);
        data.mode=Number(request.mode);
        data.cheated=Boolean(request.cheated);
        //hopefully sterile data by now;

    if(isValidData(data)){
        handleValidData(data)
        res.send("Post recieved and valid!");
    }else{
        res.send("Post recieved invalid!");
    }
    
})

app.get("/api/leaderboard:id", (req,res)=>{
    const select=parseInt(req.params.id)
    if(select===1){
        res.json(leaderboard1mode);
    }else{
        res.json(leaderboard2mode);
    }
    
} )

    function save(){    //make sure no data is lost
        const lead1Str= JSON.stringify(leaderboard1mode, null, 2);
        try{
        fs.writeFileSync('./database/leader1.json', lead1Str);
        }catch(err){
            throw new error("writing error occured:",err);
        }
        const lead2Str= JSON.stringify(leaderboard2mode, null, 2);
        try{
        fs.writeFileSync('./database/leader2.json', lead2Str);
        }catch(err){
            throw new error("writing error occured:",err);
        }
        return "Saved"
    }

    // in case external processes force terminate nodejs
    process.on('SIGTERM', save);
    process.on('SIGQUIT', save);
    // on ctrl-c
    process.on('SIGINT',()=>{
        save()
        process.exit(0);
    })
    process.on('exit',(code)=>{
        console.log("saving...");
        console.log(save());
    })

app.listen(4000, ()=>{console.log("listening on port 4000")})

