//const express = require('express')
import express from 'express';
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

app.listen(4000, ()=>{console.log("listening on port 4000")})