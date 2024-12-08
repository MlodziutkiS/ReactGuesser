import React, { useEffect, useState } from 'react';
import Dropzone from '../AdminPanel/dropZone';
import axios from 'axios';
import PrevDummy from '../AdminPanel/PrevDummy';
import Cookies from 'js-cookie';

function AddPhotos(){

  const [useData, setUserData] = useState({username:"", password:""})
  const [token, setToken]= useState();
  const [preview, setPreview] = useState({title:'Title', description:'Description', price:'10'});

  async function getToken(username, password) {
    axios.post('/api/login', {
      username: username,
      password: password
    })
    .then(function (response) {
      let newToken= response.data.token;
      setToken(newToken);
      Cookies.set('token', newToken,{expires:1/24, path:''})
    }).catch((err)=>{
      console.log(err);
    })

  }

  function handleInputChange(e){
    //preview[e.target.name]= e.target.value
    setPreview((prev)=>({
      ...prev,
      [e.target.name] : e.target.value,
    }));
  }

  function handleSubmit(e){
      e.preventDefault();     
      const formData = new FormData(e.currentTarget);
      const file =  formData.getAll("my-file");
      const title = formData.get("title");
      const desc =  formData.get("description");
      const price = formData.get("price");
      //console.log(token, "is token");

      axios.post('api/upload', {desc, title, price, file}, {headers:{'Authorization': token, "Content-Type":"multipart/form-data"}})
      .then(function (response) {//console.log(response)
        })
      .catch((error)=>{
        if(error.status===401){
          getToken(useData.username, useData.password);
        }
      })
    }


    useEffect(()=>{
      try{
        const tokenCookie = Cookies.get('token');
        if(tokenCookie===undefined){
          console.log("no cookie found");
          throw new Error("token in not in cookies");
        }else{
          console.log("found your cookie")
          setToken(tokenCookie);
        }
      }catch{
        let username = window.prompt("Please enter your name");
        let password = window.prompt("Please enter your password");
        setUserData({username,password});
        getToken(username, password);
      }
    },[])

    return (
        <form onSubmit={handleSubmit} style={{width:'100%'}}>
            <Dropzone name ="my-file" required/>
            <div style={{display:'flex', flexDirection:'row'}}>
              <aside style={{display:'flex', flexDirection:'column', width:'30%', margin:'auto'}}>
                  <label>Title</label>
                <input type='text' name='title' maxLength={50} onChange={handleInputChange}></input>
                  <label>Description</label>
                <textarea type='text' name='description' rows={20} cols={30} onChange={handleInputChange}></textarea>
                  <label>Price</label>
                <input type='number' name='price' onChange={handleInputChange}></input>
                <button type="submit">Submit</button>
              </aside>
              <aside>
                <PrevDummy data={preview}></PrevDummy>
              </aside>
            </div>
          </form>
    );
}
export default AddPhotos;