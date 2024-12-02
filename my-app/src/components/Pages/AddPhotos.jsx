import React, { useEffect, useState } from 'react';
import Dropzone from './dropZone';
import axios from 'axios';

function AddPhotos(){

  const [useData, setUserData] = useState({username:"", password:""})
  const [token, setToken]= useState();

  async function getToken(username, password) {
    axios.post('/api/login', {
      username: username,
      password: password
    })
    .then(function (response) {
      let newToken= response.data.token;
      setToken(newToken);
              // Now get the form data as you regularly would
    })

  }

  function handleSubmit(e){
      e.preventDefault();     
      const formData = new FormData(e.currentTarget);
      const file =  formData.getAll("my-file");
      const title = formData.get("title");
      const desc =  formData.get("description");
      const price = formData.get("price");
      console.log(token, "is new token");

      axios.post('api/upload', {desc, title, price, file}, {headers:{'Authorization': token, "Content-Type":"multipart/form-data"}})
      .then(function (response) {console.log(response)})
      .catch((error)=>{
        if(error.status===401){
          getToken(useData.username, useData.password);
        }
      })
    }


    useEffect(()=>{
      let username = window.prompt("Please enter your name");
      let password = window.prompt("Please enter your password");
      setUserData({username,password});
      if(!token){getToken(username, password);}
    },[])

    return (
        <form onSubmit={handleSubmit}>
            <Dropzone name ="my-file" required/>
            <input type='text' name='title'></input>
            <input type='text' name='description'></input>
            <input type='number' name='price'></input>
            <button type="submit">Submit</button>
          </form>
    );
}
export default AddPhotos;