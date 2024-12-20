import React, { useEffect, useState } from 'react';
import './MovieBox.css';
import { preload } from 'react-dom';
import axios from 'axios';

function MovieBox(){

    const [vidId, setvidId]=useState(0);
    const [videos, setVideos]=useState(undefined);
    let maxId=0;
    
    useEffect(()=>{
        axios.get("/api/videos").then(
        data => setVideos(data.data)
       ).catch(()=>{
        console.log("error fetching /api/videos");
       })
    },[vidId])
    //console.log(videos[vidId+1]);
    function handlePreload(){/*
         
        ## awaiting {as: "video"} to become a valid value
        ## look for /react-dom/cjs/react-dom-client.development.js changes
        try{
            preload(videos[vidId+1].link, {as: "video"});
            preload(videos[videos.length-1].link, {as: "video"});
            preload(videos[vidId-1].link, {as: "video"});
        }
        catch{
            //console.log("womp womp preload didnt preload something");
	}*/return;}
    if(videos===undefined){
        return(<p>Loading...</p>)
    }else{
        maxId = videos.length-1
    }
    return(
        <div className='videoBox'>
            <button onClick={() => vidId===0? setvidId(maxId):setvidId(vidId-1)}>&lt;</button>
            <video width="50%" height="auto" controls key={vidId} onCanPlay={handlePreload()}>
                <source key={vidId} src={videos[vidId].link} type="video/mp4"/>
            Your browser does not support the video tag.<br/>description {videos[vidId].desc}
            </video>
            <button onClick={() => vidId===maxId? setvidId(0):setvidId(vidId+1)}>&gt;</button>
        </div>
    );
}
export default MovieBox; 