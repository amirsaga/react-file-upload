import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    selectedFile: null
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    axios.post('https://us-central1-react-storage-fb929.cloudfunctions.net/uploadFile', fd, {
      onUploadProgress: progressEvent => {
        console.log('Upload Progress: ' + progressEvent.loaded / progressEvent.total * 100 + ('%'))
      }
    })
    .then(res => {
      console.log(res);
    });
  }
  render() {
    return (
      <div className="App">
        <input style={{display: 'none'}}
        type="file" 
        onChange={this.fileSelectedHandler}
        ref={fileInput => this.fileInput = fileInput}/>
        <button onClick={() => this.fileInput.click()}>Pick Image</button>
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default App;
