import downArrow from "../../../public/images/Arrow-down.svg";

function DoodleSearch ({setSelectedDoodle, selectedDoodle, updateMatchingDoodleIndexBackward, updateMatchingDoodleIndexForward, doodleDrop}){
    const handleTextChange = (e) => {
        setSelectedDoodle(e.target.value);
      };

return(
    <label className="input input-bordered border-4 flex bg-neutral-600 w-1/2">
                    <details id="quickSerachDrop" className="dropdown">
                      <summary className="flex">
                        <input
                          type="text"
                          className="bg-neutral-600 w-full text-2xl"
                          placeholder="Search Doodle..."
                          onChange={handleTextChange}
                          value={selectedDoodle}
                          onClick={() =>
                            (document.getElementById(
                              "quickSerachDrop"
                            ).open = true)
                          }
                        />

                        <svg
                          xmlns={downArrow}
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="w-8 h-8 opacity-70"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                          />

                        </svg>
                      </summary>
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 h-52">
                        {doodleDrop}
                        <div className="flex justify-between">
                          <button
                            className="btn"
                            onClick={() => {
                              updateMatchingDoodleIndexBackward();
                            }}
                          >
                            {" "}
                            {"<"}{" "}
                          </button>
                          <button
                            className="btn"
                            onClick={() => {
                              updateMatchingDoodleIndexForward();
                            }}
                          >
                            {" "}
                            {">"}{" "}
                          </button>
                        </div>
                      </ul>
                    </details>
                  </label>
)
}

export default DoodleSearch