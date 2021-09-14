import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.svg';
import './App.scss';
import {getArticlesApi} from "./api";
import FileHelper from './utils/file';
const {join} = window.require('path');
// const { app, remote } = window.require('electron');
// const { app, remote } = window.require('electron')
// const { app } = window.require('electron');
// const electron = window.require('electron')
// const { app, remote} = window.electron;
// const savedlocation = remote.app.getPath('documents');
// console.log(savedlocation);

function App() {
  // FileHelper.writeFile(join(savedlocation, 'hello.md'),'Hello Word App.js');

  useEffect(()=>{
    var fs = window.require('fs');
    // const fs = require('fs');
console.dir(fs);
    // 业务逻辑
    getDataApiFn();
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://v1.hitokoto.cn');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText);
        var hitokoto = document.getElementById('hitokoto');
        hitokoto.innerText = data.hitokoto;
      }
    }
    xhr.send();
    return () => {
      // 销毁
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const getDataApiFn = () => {
    //🦌
    getArticlesApi().then((res) => {
      if(res.data.data){
        console.log(res.data.data)
      } else {
        console.log('查询失败！！！')
        // message.error('更新失败').then(r => {});
      }
    })
        .catch((err) => requestError(err))
        .finally()
  }

  const requestError = (err) => {
    console.log(err)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" onClick={()=>getDataApiFn()}/>
        <p>Electron React </p>
        <p>Sass + Fortawesome + Axios + FS(I/O)</p>
        <p id="hitokoto">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p><FontAwesomeIcon icon={faCoffee} /></p>
      </header>
    </div>
  );
}

export default App;
