import React, {useRef} from 'react';
import { useMemo } from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#AAA',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#333',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const img = {
  display: 'block',
  width: '20em',
  height: 'auto',
};

const flex ={
  display: 'flex',
  flexWrap:'wrap'
};

const PhotoContainer ={
  padding: '1em',
}


function Dropzone(props) {
  const {required, name} = props; 

  const hiddenInputRef = useRef(null);

  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop: (incomingFiles) => {
      if (hiddenInputRef.current) {
        // Note the specific way we need to munge the file into the hidden input
        // https://stackoverflow.com/a/68182158/1068446
        const dataTransfer = new DataTransfer();
        incomingFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        hiddenInputRef.current.files = dataTransfer.files;
      }
    },
    noClick: true,
    uploadMultiple: true,
    accept: {
      'image/*': ['.png','.jpg', '.jpeg', '.webp'],
    }
  });

  const files = acceptedFiles.map(file => (
    <div key={file.path} style={PhotoContainer}>
      <img src={URL.createObjectURL(file)} style={img}></img>
      {file.path} - {file.size} bytes
    </div>
  ));

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);


  return (
    <div className="container">
      <div {...getRootProps({style})}>
        {//<input type='file'></input>
        }
        <input type ="file" name={name} required={required} style ={{opacity: 0}} ref={hiddenInputRef}/>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <button type="button" onClick={open}>
          Open File Dialog
        </button>
      </div>
      <aside>
        <h4>Files</h4>
        <div style={flex}>{files}</div>
      </aside>
    </div>
  );
}

export default Dropzone;