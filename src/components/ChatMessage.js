import me from "../assets/avatar.png";
import robotSVG from "../assets/robot.svg";
import TextareaAutosize from 'react-textarea-autosize';
import { useEffect, useState, useRef } from "react";


function ChatMessage({ message, speech }) {
  const [mes, setMes] = useState('');
  const textAreaRef = useRef(null);

  const scrollToBottom = () => {
    textAreaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scrolls bottom to show the last message added in the chat log
  // useEffect(() => {
  //   scrollToBottom();
  // }, [mes.length])

   // - API answer is stored in a variable called 'mes' and then displayed as if someone's typing it.
  // - If the speech mode is on then the typing is slower in order to make the speech and typing as close as possible to each other.
  function typeMessage(apiAnswer) {
    let index = 0;
    let text = ''
    
    let interval = setInterval(() => {
      if(index < apiAnswer.length) {
        text += apiAnswer.charAt(index);
        index++;
        setMes(text);
        
      } else {
        clearInterval(interval);
      }
    }, speech ? 50 : 25) 
  }

  useEffect(() => {
    typeMessage(message.message)
  }, [])

  return (
    <div>
      <div className="w-[75%]  mt-4 ml-52 shadow-lg">
        <div className={`${message.user === 'GPT' ? 'bg-[#1b1e22]' : 'bg-[#252b30]'} flex  flex-row gap-3 mx-auto p-3 px-10 rounded-lg`} >
          <div className={` flex flex-row gap-3 w-[60px] h-[36px] mr-6 rounded-md`}>
            <img
              className="w-11 h-9 p-[1px]  items-center rounded-md"
              src={`${message.user === 'GPT' ? robotSVG : me}  `}
              alt="avatar"
            />
          <span className={`${message.user === 'GPT' ? 'text-[#edede9]': 'text-[#00b4d8]'} font-bold mt-3`}>{message.user}:</span> &nbsp;

          </div>
          {/* API response comes with two empty lines, therefore trimStart is used */}
          <TextareaAutosize 
          className={`bg-transparent  w-full mt-1 outline-none rounded-lg pl-3 py-2 resize-none`}
          // The typing effect function is only used on API response
          value={`${message.user === 'GPT' ? mes.trimStart() : message.message.trimStart()}`} 
          minRows={1} 
          maxRows={45} 
          readOnly 
           >
            {`${message.user === 'GPT' ? mes.trimStart() : message.message.trimStart()}`}
          </TextareaAutosize>
          
        </div>
        {/* <div ref={textAreaRef}></div> */}
      </div>
    </div>
  );
}

export default ChatMessage;
