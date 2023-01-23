import robotSVG from "../assets/robot.svg";
function DalleChatLog({ message, imageURLs, size }) {
  return (
    <div  className="flex flex-col overflow-x-hidden  ">
    {  message.user === 'GPT' && 
    (        
        <div className= {` flex flex-row gap-2 ml-[208px] items-center justify-start text-left bg-[#424b54]/30 pb-7 mt-4  rounded-lg pl-9 w-[75%] h-[62px] `}>
            <img
                  className="w-11 h-9 p-[1px] mt-[26px] items-center rounded-md"
                  src={robotSVG}
                  alt="avatar"
                />
            <h2 className="text-left mt-8  text-[18px] ">
              <span className="font-semibold tracking-wide text-[17px]"> Dall-E: </span> &nbsp;  {message.message.trimStart()} 
            </h2> 
        </div>)}
       
        <div className={` grid grid-cols-1 gap-y-6 gap-x-0 py-3 mt-9 w-[85vw] mx-auto items-center justify-center`}>
        {imageURLs.map((url, index) => {
            return (
                <img className={`${size === '256x256' ? 'w-[256px] h-[256px]' : 'w-[400px] h-[400px]'}  rounded-md mx-auto left-0 right-0`} src={url.url} alt={`requested - ${index}`} key={index}/>
            );
          })}
        </div>
           
    </div>
  );
}
export default DalleChatLog;

