import React, { useEffect, useState } from 'react';
import Dropzone from './dropZone';
import axios from 'axios';

function AddPhotos(){

  const [useData, setUserData] = useState({username:"", password:""})
  const [token, setToken]= useState();

  function handleSubmit(e){
      e.preventDefault();   
      let newToken
     
      axios.post('/api/login', {
        username: useData.username,
        password: useData.password
      })
      .then(function (response) {
        newToken= response.data.token;
        setToken(newToken);
                // Now get the form data as you regularly would
      })

      const formData = new FormData(e.currentTarget);
      const file =  formData.get("my-file");
      const title = formData.get("title");
      const desc =  formData.get("description");
      const price = formData.get("price");

      axios.post('api/upload', {desc, title, price, file}, {headers:{Authorization: newToken, "Content-Type":"multipart/form-data"}})
      .then(function (response) {console.log(response)})
      .catch(function (error) {
        console.log(error);
      })
    }


    useEffect(()=>{ let username = window.prompt("Please enter your name")
      let password = window.prompt("Please enter your password")
      setUserData({username,password})},[])



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