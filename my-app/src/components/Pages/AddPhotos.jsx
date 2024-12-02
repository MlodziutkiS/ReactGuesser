import React from 'react';
import Dropzone from './dropZone';

function AddPhotos(){
    return (
        <form onSubmit={(e) => {
            e.preventDefault(); 
            
            // Now get the form data as you regularly would
            const formData = new FormData(e.currentTarget);
            const file =  formData.get("my-file");
            alert(file.name); 
          }}>
            <Dropzone name ="my-file" required/>
            <button type="submit">Submit</button>
          </form>
    );
}
export default AddPhotos;