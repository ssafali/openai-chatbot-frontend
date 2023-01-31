import { useContext } from 'react';
import { AuthContext } from "../context/auth.context";

function GptSettings({ 
    selectedEngine, handleEngine, engineList, handleToken, setToken, token, handleTemp, temp, clearChatLog }) {
    const { logOutUser } = useContext(AuthContext);

    return (
        <aside className="bg-[#1a1b1d] h-screen w-[280px] right-0 top-0 fixed ">
           
          <div className="flex flex-col items-left ml-3 mt-12 font-semibold gap-4">
            
            <div className="flex flex-row gap-2">
              <label className="p-1 mt-[3px]">Engine:</label>
              <select
                value={selectedEngine}
                onChange={(e) => {handleEngine(e); setToken(256)}}
                className="rounded-lg p-1 w-[170px] text-white bg-[#34343f] outline-none opacity-90 hover:opacity-100 font-sans "
               
              >
                {engineList.map((engine, index) => {
                  return (
                    <option className='font-semibold' key={index} value={engine.id}>
                      {engine.id}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-row gap-2 p-1 ">
              <label className='mt-1'>Token:</label>
              <input
                className="mt-0 w-24 accent-[#0da37fcc] border-none"
                placeholder="temp"
                type="range"
                min="0"
                max={selectedEngine === 'code-davinci-002' ? '8000' : selectedEngine.includes('text-davinci') ? '4000' : '2048'}
                step="1"
                onChange={handleToken}
                value={token}
              />
              <input 
              className='bg-transparent w-12 border-[1px] rounded-md text-center p-1 font-light outline-none' 
              value={token}
              max={selectedEngine === 'code-davinci-002' ? '8000' : selectedEngine.includes('text-davinci') ? '4000' : '2048'}
              min='0'
              onChange={handleToken}
              type='number'
              >
              </input>
            </div>
            <div className="flex flex-row gap-2 p-1">
              <label className='mt-1'>Temperature:</label>
              <input
                className="mt-0 w-24 accent-[#0da37fcc] border-none"
                placeholder="temp"
                type="range"
                min="0"
                max="1"
                step="0.01"
                onChange={handleTemp}
                value={temp}
               
              />
            <input 
              className='bg-transparent w-11 border-[1px] rounded-md text-center p-1 font-light outline-none' 
              value={temp}
              step='0.01'
              type='number'
              onChange={handleTemp}
              >
              </input>
            </div>
            <a href='/examples' className='hover:underline'>What can I ask?</a>
          </div>
          <button
            className="fixed right-[160px] bottom-6 hover: rounded-md z-10 hover:bg-opacity-5 hover:bg-white duration-300
                      p-3 border-[1px] border-solid border-white text-center"
            onClick={() => {
              clearChatLog();
            }}
          >
            Clear Chat
          </button>
          <button
            className="fixed right-5 bottom-6 hover: rounded-md z-10 hover:bg-opacity-5 hover:bg-white duration-300
                      p-3 border-[1px] border-solid border-white  text-center"
            onClick={logOutUser}
          >
            Logout
          </button>
        </aside>
    );
}

export default GptSettings;