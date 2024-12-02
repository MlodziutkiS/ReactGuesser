import React from 'react';
import Dropzone from './dropZone';
import axios from 'axios';

function AddPhotos(){
    return (
        <form onSubmit={(e) => {
            e.preventDefault(); 
            
            // Now get the form data as you regularly would
            const formData = new FormData(e.currentTarget);
            const file =  formData.get("my-file");
            const title = formData.get("title");
            const desc =  formData.get("description");
            const price = formData.get("price");

            

            alert(file.name); 
          }}>
            <Dropzone name ="my-file" required/>
            <input type='text' name='title'></input>
            <input type='text' name='description'></input>
            <input type='number' name='price'></input>
            <button type="submit">Submit</button>
          </form>
    );
}
export default AddPhotos;