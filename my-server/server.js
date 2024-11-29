import express, { json, text } from 'express';
import carsBak from './database/cars.js';
import videos from './database/videos.js';
//parse Post body
import bodyParser from 'body-parser';
//reading data on startup and saving on termination
import process from 'node:process';
import fs from 'fs';
import { error } from 'node:console';
//authorization
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
//file uploads
import fileUpload from 'express-fileupload';
import path from 'node:path';

const app = express()

app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:3000'}))
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    //debug:true,
    parseNested:true,
}));

let cars=[];

try{
    const readCars=fs.readFileSync('./database/cars.json', 'utf8');
    cars=JSON.parse(readCars);
}catch(err){
    console.log("error reading data: ", err);
    cars=carsBak;
    console.log("cars fallback to cars.js:");
}

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
                //console.error("unknown mode recieved: "+ mode);
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

let users=[];

try{
    const readSecrets=fs.readFileSync('./database/secrets.json', 'utf8');
    users=JSON.parse(readSecrets);
}catch(err){
    console.error("Error reading secrets: ", err);
}

const SECRET_KEY="salt and pepper for passwords";

app.post("/api/login", async(req,res)=>{
    const {username , password} = req.body;

    const user= users.find(user=> user.username === username);
    if(user===undefined) return res.status(400).json({message:'error 400: Bad Request'});

    const passMatch= await bcrypt.compare(password, user.password);
    if(!passMatch) return res.status(400).json({message:'error 400: Bad Request'});

    const token=jwt.sign({username: user.username}, SECRET_KEY, {expiresIn:'1h'});

    res.json({token});
})


function createNextAutoDirectory(basePath) {
    // Read existing directories in the base path
    const existingDirs = fs.readdirSync(basePath)
        .filter((dir) => /^auto\d+$/.test(dir)) // Match directories like "auto1", "auto2", etc.
        .map((dir) => parseInt(dir.replace('auto', ''), 10)) // Extract the number
        .sort((a, b) => a - b); // Sort numerically

    // Determine the next available number
    const nextNumber = existingDirs.length > 0 ? existingDirs[existingDirs.length - 1] + 1 : 1;
    const newDirName = `auto${nextNumber}`;

    // Create the new directory
    const newDirPath = path.join(basePath, newDirName);
    fs.mkdirSync(newDirPath);
    console.log(`Created new directory: ${newDirPath}`);

    return newDirPath;
}


app.post("/api/upload",(req,res)=>{

    const token= req.headers['authorization'];
    //if(!token) return res.status(401).json({message:"error 401: Unauthorized"});

    jwt.verify(token, SECRET_KEY, (err, decoded)=>{
        //if(err) return res.status(401).json({message:'error 401: Unauthorized'});
        
        res.json({message:'Access granted'});
        
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
          }

        //console.log(req.files);
        const allFiles=req.files;
        const __dirname = path.resolve(path.dirname(''));

            const basePath=path.resolve(__dirname,"../my-app/public/gruzy");
            const newUploadPath=createNextAutoDirectory(basePath);

            const lastCarsIndex=cars.length;
            let newPhotos=[];
            let newDesc=String(req.body.desc);
            let newTitle=String(req.body.title);
            let newPrice=Number(req.body.price);

            console.log(basePath,"is base path", newUploadPath,"is new folder path");

            Object.entries(allFiles).forEach(([input, upload])=>{

                console.log("new file:",upload.name,"uploaded by:", decoded, "from input:",input);

                const filePath=path.join(newUploadPath, upload.name);

                upload.mv(filePath,(err)=>{
                    if(err!==undefined){console.log("error 500:",err);}
                })
                newPhotos.push(filePath.slice(filePath.indexOf("gruzy")))
            })

            const newEntries= new Map([
                ["id", lastCarsIndex],
                ["title", newTitle],
                ["desc", newDesc],
                ["price", newPrice],
                ["photos", newPhotos]
            ])

            const newObj= Object.fromEntries(newEntries);
            cars.push(newObj);
        
    })

    res.status(200);

    
})


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
        const carsStr= JSON.stringify(cars, null, 2);
        try{
            fs.writeFileSync('./database/cars.json', carsStr);
        }catch(err){
            throw new error("writing error ocured:",err);
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

