import { useEffect, useState } from "react";
import robotSVG from "../assets/robot.svg";

const Loading = ({ bot }) => {
  const [dots, setDots] = useState('')
  
  
  function loader () {
    let loadInterval;
    let dot ='';
    loadInterval = setInterval(() => {
      dot += '.'
      setDots(dot)
      if (dot === '...') {
        dot = '';
      }
    }, 300)
  }
  
  useEffect(() => {
    loader();
  },[])


  return (
    <div className="flex flex-row mt-4 ml-[208px] text-lg gap-2 bg-[#424b54]/30 w-[75%] h-[62px] rounded-md pl-9 pt-3">
      <img src={robotSVG} alt='robot' className="w-11 h-9 p-[1px] "/> 
      <p className="font-bold text-[#edede9] text-[17px] pt-2 tracking-wide">{bot} <span className="pl-[18px] font-normal text-[17px] tracking-wide">{` Thinking ${dots}`}</span></p>
    </div>
  );
};

export default Loading;
