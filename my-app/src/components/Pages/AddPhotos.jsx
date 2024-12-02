import React, { useState } from 'react';

function AddPhotos(){

    const [photos, addPhotos]= useState(["photo1", "photo2"]);

    function addInput(){
        addPhotos()
    }

    return (
    <div>

    </div>
    );
}
export default AddPhotos;