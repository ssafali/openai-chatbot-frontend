import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/auth.context";
import ChatMessage from "../components/ChatMessage";
import { useSpeechRecognition } from "react-speech-kit";
import { useSpeechSynthesis } from "react-speech-kit";
import Loading from "../components/Loading";
import GptSettings from "../components/GptSettings";
import GptForm from "../components/GptForm";
import Info from "../components/Info";
import { Link } from "react-router-dom";

function Gpt() {
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState('hidden')
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [engineList, setEngineList] = useState([]);
  const [selectedEngine, setEngine] = useState("text-davinci-003");
  const [prompt, setPrompt] = useState("");
  const [temp, setTemp] = useState(0.7);
  const [token, setToken] = useState(256);
  const [voice, setVoice] = useState();
  const [speech, setSpeech] = useState(false);
  // Speech synthesis reads the api answer of the user GPT when speech variable is on
  const { speak, voices } = useSpeechSynthesis({});
  // The variable synth makes it possible to have access of the speech. synth.cancel() would stop the current speech that's being played.
  const synth = window.speechSynthesis;
  // Speech recognition sets the prompt variable as the speech input.
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setPrompt(result);
    },
  });
  // Following ref is used to scroll bottom when the cumulative height of the messages in chat log exceeds the screen height
  const messagesEndRef = useRef(null);
  // Following is default values in chat log
  const [chatLog, setChatLog] = useState([
    {
      user: "GPT",
      message: `Hi ${user.name}! How can I help you today? `,
    },
  ]);

  // OpenAI can be called on the frontend but here the following calls it from the backend.
  const makeCall = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:5005/api", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedEngine,
        prompt: prompt,
        token: token,
        temp: temp,
      }),
    });
    const data = await response.json();
    
    setChatLog((chatLog) => [
      ...chatLog,
      { user: "GPT", message: `${data.message}` },
    ]);
    setIsLoading(false);
    // If the speech mode is on then api response is read by the following speak function
    if (speech) {
      // Here the standard filter method is used to find the object in the voices list that has the name ‘Microsoft Zira’.
      // if not found then the default is used.
      voices.filter((v) => {
        if (v.name.includes("Zira")) {
          setVoice(v);
          return v;
        }
      });
      speak({ text: data.message, voice: voice });
    }
  };

  // User gets to chose the desired OpenAI engine/model. It's then sorted alphabetically to improve accessibility.
  useEffect(() => {
    const getEngineList = async () => {
      try {
        await axios
          .get("http://localhost:5005/api/engines", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          .then((res) => {
            const data = res.data.data.sort((a, b) => {
              const engineA = a.id;
              const engineB = b.id;
              if (engineA < engineB) {
                return -1;
              }
              if (engineA > engineB) {
                return 1;
              }
              return 0;
            });
            setEngineList(data);
            return res.data.data.data;
          });
      } catch (err) {
        console.log(err);
      }
    };
    getEngineList();
  }, []);

  const handleEngine = (e) => {
    setEngine(e.target.value);
    console.log(e.target.value);
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  // Temperature is a variable from OpenAI, in general, the lower the temperature, the more likely the chosen engine
  // will choose words with a higher probability of occurrence.
  const handleTemp = (e) => {
    setTemp(parseFloat(e.target.value));
    console.log(temp);
    
  };

  // Token is another variable from OpenAI. You can think of tokens as pieces of words used for natural language
  // processing. For English text, 1 token is approximately 4 characters or 0.75 words.
  const handleToken = (e) => {
    setToken(parseFloat(e.target.value));
    console.log(token)
  };

  // Deletes the chat log and sets it back to default when the user clicks on 'New Chat'.
  const clearChatLog = () => {
    setChatLog([
      {
        user: "GPT",
        message: `Hi ${user.name}! How can I help you today?`,
      },
    ]);
  };

  // After destructuring the chat log, the last question asked by the user is repeated.
  // The purpose of this is to get a different answer, if possible.
  const regenerate = () => {
    const lastPrompt = chatLog
      .slice()
      .reverse()
      .find((el) => el.user === "Me");
    if(lastPrompt) {
      setPrompt(lastPrompt.message);
      handleSubmit();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(prompt.length > 0) {
      makeCall();
      setChatLog((chatLog) => [...chatLog, { user: "Me", message: `${prompt}` }]);
      setPrompt("");
    }
    else {
      alert('You must ask something first to repeat your question.')
    }
  };

  return (
    <div className="flex inset-x-0 text-center absolute w-screen overflow-x-hidden font-nunito">
          <button 
          type="button"   
          onMouseEnter={() => setStyle('block')}
          onMouseLeave={() => setStyle('hidden')}
          className='cursor-default'
          >
            <svg class="w-7 h-7 opacity-80 hover:opacity-100 fixed left-2  bottom-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </button>
          <Link to='/dall-e'>
          <button
            className="fixed left-12 bottom-7  hover: rounded-md z-10 hover:bg-opacity-5 hover:bg-white duration-300
                      p-3 border-[1px] border-solid border-white  text-center"
            type='button'
          >
            DALL·E 2
          </button>
          </Link>
          <p className={`${style} absolute w-36 h-36 left-8 bottom-0 text-sm bg-[#41414f] rounded-lg px-2 py-3`}>
            Dall-E is an AI system that can create realistic images and art from a description in natural language.
          </p>

      <div className="z-50"><Info/></div>
      <section className="flex-1 w-[85vw] h-[90vh] pl-[72px]">
        <div className="flex flex-col w-[85vw] h-[90vh] text-left">
          {chatLog.map((message, index) => {
            return (
              <div key={index}>
                <ChatMessage
                  key={index}
                  message={message}
                  speech={speech}
                />
                <div ref={messagesEndRef} />
              </div>
            );
          })}
          
          {isLoading && (
            <div>
              <Loading bot={'GPT:'}/>
            </div>
          )}
        </div>

        <GptForm 
          handleSubmit={handleSubmit} listening={listening} prompt={prompt} handlePrompt={handlePrompt}
          listen={listen} regenerate={regenerate} speech={speech} synth={synth} setSpeech={setSpeech}
          stop={stop}
        />

        <GptSettings
          selectedEngine={selectedEngine} handleEngine={handleEngine} engineList={engineList}
          handleToken={handleToken} token={token} handleTemp={handleTemp} temp={temp}
          clearChatLog={clearChatLog}
        />
      </section>
      
    </div>
  );
}
export default Gpt;
