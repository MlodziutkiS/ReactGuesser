//const express = require('express')
import express from 'express';
import cars from './database/cars.js';
import videos from './database/videos.js';

const app = express()

app.get("/api/cars/:id", (req,res) =>{
    const carIn = parseInt(req.params.id);
    if(carIn >=0 && carIn<cars.length){
        const short = req.query.short !== undefined;
        if(short){
            res.json({
                id: cars[carIn].id,
                title: cars[carIn].title,
                price: cars[carIn].price,
                photos: cars[carIn].photos.at(0)
            });
        }else{
            res.json(cars[carIn]);
        }
        
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