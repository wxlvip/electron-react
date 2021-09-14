/* 
使用说明：
1.引入 useKeyPress.js
import useKeyPress from './hooks/useKeyPress';
2.在组件中使用
const enterPressed = useKeyPress(13);
  // const escPressed = useKeyPress(27);
  useEffect(()=>{
    if(enterPressed){
      alert('你按下了 Enter 键')
    }
  });
*/
import { useState, useEffect } from 'react'

const useKeyPress =(targetKeyCode)=>{
    const [keyPressed, setKeyPressed] = useState(false);

    const keyDownHandler = ({ keyCode }) => {
        if(keyCode === targetKeyCode){
            setKeyPressed(true);
        }
    }

    const keyUpHandler = ({ keyCode }) => {
        if(keyCode === targetKeyCode){
            setKeyPressed(false);
        }
    }
    
    useEffect(()=>{
        document.addEventListener('keydown', keyDownHandler)
        document.addEventListener('keyup', keyUpHandler)
        return ()=>{
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        }

    },[]);
    return keyPressed;
}

export default useKeyPress;