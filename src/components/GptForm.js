import regeneratePNG from "../assets/regenerate.png";
import megaphone from "../assets/megaphone.png";
import noAudio from "../assets/no-audio.png";
import mic from "../assets/mic.svg";
import micOff from "../assets/mic-off.svg";

function GptForm( {
    handleSubmit, listening, prompt, handlePrompt, listen, regenerate,
    speech, synth, setSpeech, stop} ) {
    return (
        <form
          className="p-3 fixed bottom-0 left-36 min-w-[20px] w-[77%] max-w-[80%] "
          onSubmit={handleSubmit}
      >
        {/* User input */}
        <input
          autoComplete="off"
          rows="1"
          className="bg-[#34343f] h-12 w-[80%] pr-28 rounded-md border-none resize-none outline-none m-3 shadow-lg px-3 pb-4 pt-[14px] focus:placeholder:text-white"
          placeholder={`${listening ? "Listening..." : "Ask something"}`}
          type="text"
          name="prompt"
          value={prompt}
          onChange={handlePrompt}
        />

        {/* Toggles microphone */}
        <button
          onMouseDown={listen}
          onMouseUp={(e) => {
            stop();
            {prompt.length > 0 && (handleSubmit(e))}
          }}
          type="button"
          title="Click and hold while talking"
        >
          <img
            src={`${listening ? mic : micOff}`}
            alt="microphone"
            className="w-10 h-10 absolute  right-52 bottom-7 cursor-pointer opacity-75 hover:opacity-100 duration-300"
          />
        </button>

        {/* Submits user input */}
        <button type="submit">
          <svg
            className="w-6 h-6 absolute right-44 bottom-9 cursor-pointer opacity-75 hover:opacity-100 duration-300"
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

        <button
          className="absolute bottom-[18px] mt-7 text-[10px] opacity-80 tracking-wider"
          title="Regenerate the last question"
          type="submit"
          onClick={() => {
            regenerate();
          }}
        >
          <img
          
            className="w-6 opacity-75 hover:opacity-100 duration-300 mb-2 ml-1"
            src={regeneratePNG}
            alt="regenerate"
          />
          Repeat
        </button>

        {/* Stops playing the speech */}
        {speech && (
          <button
            type="button"
            className="absolute right-[61px] bottom-9 w-6 h-7 opacity-75 hover:opacity-100 duration-300 "
            onClick={() => synth.cancel()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
              />
            </svg>
          </button>
        )}

        {/* Speech toggle button */}
        <button
          className="absolute mt-6 right-1 bottom-9"
          type="button"
          onClick={() => {
            setSpeech(!speech);
            {
              speech === false && synth.cancel();
            }
          }}
        >
          <img
            className="relative w-6 h-7 opacity-75 hover:opacity-100 duration-300 "
            src={`${speech ? megaphone : noAudio}`}
            alt="speech"
          />
        </button>

        {speech && (
          <p className="absolute right-[40px] bottom-2 mt-1 w-16 text-[10px] opacity-80 tracking-wider">
            Cancel speech
          </p>
        )}

        <p className="absolute right-[-1%] bottom-2 text-[10px] mt-1 w-16 opacity-80 tracking-wider">
          {speech ? "Turn off speech" : "Turn on speech"}
        </p>
      </form>
    );
}

export default GptForm;