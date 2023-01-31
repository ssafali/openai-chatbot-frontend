import { useState, useRef, useEffect } from "react";

function Info() {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  // Closes info component when anywhere else is clicked
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="fixed top-3 right-3 ">
      <button className="mb-5" type="button" onClick={() => setShow(!show)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-[30px] h-[30px] absolute top-0 hover:stroke-[#9af1ddcc]  right-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </button>

      {show && (
        <div
          ref={ref}
          className="flex flex-col w-64  text-sm bg-[#34343f] rounded-lg px-1"
        >
          <span className="font-bold pt-2 mb-2 tracking-wider">Engines:</span>
          <p className="px-1 pb-4">
            The OpenAI API is powered by a family of models with different
            capabilities.
            <br />
            By default <i>text-davinci-003</i> is chosen, which uses GPT-3
            model. GPT-3 models can understand and generate natural language.{" "}
            <br />
            <a
              className="text-white underline tracking-wide underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              href="https://beta.openai.com/docs/models/overview"
            >
              Find out more on different engines and models.
            </a>
          </p>

          <hr className="w-52 mx-auto" />

          <span className="font-bold pt-2 mb-2 tracking-wider">Tokens:</span>
          <p className="px-1 pb-4">
            Tokens can be thought of as pieces of words. Before the API
            processes the prompts, the input is broken down into tokens. These
            tokens are not cut up exactly where the words start or end - tokens
            can include trailing spaces and even sub-words.
          </p>

          <hr className="w-52 mx-auto" />

          <span className="font-bold pt-2 mb-2 tracking-wider">
            Temperature:
          </span>
          <p className="px-1 pb-2">
            In general, the lower the temperature, the more likely GPT-3 will
            choose words with a higher probability of occurrence. In other
            words, the temperature controls how much randomness is in the
            output.
          </p>
        </div>
      )}
    </div>
  );
}

export default Info;
