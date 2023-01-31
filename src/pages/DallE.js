import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import DalleChatLog from "../components/DalleChatLog";

function DallE() {
  const [style, setStyle] = useState("hidden");
  const { user, logOutUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const storedToken = localStorage.getItem("authToken");

  const [prompt, setPrompt] = useState("");
  const [numberOfImage, setNumberOfImage] = useState(1);
  const [size, setSize] = useState("512x512");
  const [imageURLs, setImageURLs] = useState([]);
  const [lastQ, setLastQ] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "GPT",
      message: `Hi ${user.name}! How can I help you? `,
    },
  ]);

  useEffect(() => {
    const lastPrompt = chatLog
      .slice()
      .reverse()
      .find((el) => el.user === "Me");
    setLastQ(lastPrompt ? lastPrompt.message : "");
  }, [chatLog]);

  const makeImageCall = async () => {
    setImageURLs([]);
    setIsLoading(true);
    const response = await fetch("http://localhost:5005/api/dall-e", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        n: parseInt(numberOfImage),
        size: size,
      }),
    });
    const data = await response.json();
    // console.log(data.urlList.data);
    setImageURLs(data.urlList.data);
    setChatLog((chatLog) => [
      ...chatLog,
      { user: "GPT", message: `Here are the images:` },
    ]);
    setIsLoading(false);
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleNumber = (e) => {
    if (e.target.value > 10) {
      setNumberOfImage(10);
    }
    setNumberOfImage(e.target.value);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.length > 0) {
      makeImageCall();
      setChatLog((chatLog) => [
        ...chatLog,
        { user: "Me", message: `${prompt}` },
      ]);
    } else {
      alert("You must type something first.");
    }
  };

  return (
    <div className="flex flex-col w-[80vw] h-[90vh] ml-12 text-left overflow-x-hidden">
      <button
        type="button"
        onMouseEnter={() => setStyle("block")}
        onMouseLeave={() => setStyle("hidden")}
        className="cursor-default"
      >
        <svg
          className="w-7 h-7 opacity-80 hover:opacity-100 fixed left-2  bottom-9"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </button>
      <Link to="/">
        <button
          className="fixed left-12 bottom-7  hover: rounded-md z-10 hover:bg-opacity-5 hover:bg-white duration-300
                      p-3 border-[1px] border-solid border-white  text-center"
          type="button"
        >
          Chat GPT
        </button>
      </Link>
      <div
        className={`${style} fixed pl-6 w-40 h-52 left-8 bottom-24 text-sm bg-[#34343f] rounded-lg px-2 py-3`}
      >
        <p className="font-bold">Your chatbot to help you with:</p>
        <ul className="list-disc">
          <li>Content generation</li>
          <li>Classification, categorization, and sentiment analysis</li>
          <li>Data extraction</li>
          <li>Translation</li>
          <li>Many more!</li>
        </ul>
      </div>
      <div className="flex flex-col w-[90vw] h-[90vh] text-left overflow-x-hidden">
        {/* Mapping and selecting the last element */}
        {chatLog.map((message, index, el) => {
          <p>{message.message}</p>;
          if (index + 1 === el.length) {
            return (
              <div key={index}>
                {isLoading && (
                  <div>
                    <Loading bot={'Dall-E:'}/>
                  </div>
                )}
                <DalleChatLog
                  key={index}
                  message={message}
                  imageURLs={imageURLs}
                  lastQ={lastQ}
                />
              </div>
            );
          }
        })}
      </div>

      <aside className="bg-[#1a1b1d] h-screen w-[280px] right-0 top-0 fixed">
        <div className="flex flex-col items-left ml-3 mt-12 font-semibold gap-4">
          <div className="flex flex-row gap-2">
            <label className="p-1 mt-[3px]">Size:</label>
            <select
              value={size}
              onChange={handleSize}
              className="rounded-lg p-1 w-[170px] text-white bg-[#34343f] outline-none opacity-90 hover:opacity-100"
            >
              <option value="256x256">256x256</option>
              <option value="512x512">512x512</option>
              <option value="1024x1024">1024x1024</option>
            </select>
          </div>

          <div className="flex flex-row gap-2 p-1">
            <label className="mt-1 w-20">Number of images:</label>
            <input
              className="mt-0 w-24 accent-[#0da37fcc] border-none"
              placeholder="Number"
              type="range"
              min="0"
              max="10"
              step="1"
              onChange={handleNumber}
              value={numberOfImage}
            />
            <input
              className="bg-transparent w-11 border-[1px] rounded-md text-center p-1 font-light"
              value={numberOfImage}
              step="0.01"
              type="number"
              onChange={handleNumber}
            ></input>
          </div>
          <button
            className="fixed right-5 bottom-6 hover: rounded-md z-10 hover:bg-opacity-5 hover:bg-white duration-300
                      p-3 border-[1px] border-solid border-white  text-center font-normal font-nunito"
            onClick={logOutUser}
          >
            Logout
          </button>
        </div>
      </aside>

      <form
        className="p-3 fixed pt-4 bottom-0 mx-auto left-0 right-0 min-w-[20px] w-[77%] max-w-[80%] "
        onSubmit={handleSubmit}
      >
        <input
          autoComplete="off"
          rows="1"
          className="bg-[#34343f] h-12 w-[85%] pr-20 rounded-md border-none resize-none outline-none m-3 shadow-lg px-3 pb-4 pt-[14px] focus:placeholder:text-white"
          placeholder={"Describe the image you want"}
          type="text"
          name="prompt"
          value={prompt}
          onChange={handlePrompt}
        />
        {/* Submits user input */}
        <button type="submit">
          <svg
            className="w-6 h-6 absolute right-[16rem] bottom-9 cursor-pointer opacity-75 hover:opacity-100 duration-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default DallE;
