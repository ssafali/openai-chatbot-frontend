function Example({ image, title, description }) {
  return (
    <>
      <div
        className="item flex flex-row gap-3 p-3 text-center w-[100%]  text-[ivory]"
      >
        <div className="image border-2 rounded-md p-4 ">
            {image}
        </div>
        <div className="title and description flex flex-col mb-2">
          <div className="flex title mt-3 text-lg items-start font-bold">
            {title}
          </div>
          <div className="description flex items-start ">
            {description}
          </div>
        </div>
      </div>
    </>
  );
}
export default Example;
