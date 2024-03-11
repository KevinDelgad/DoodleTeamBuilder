import Image from "next/image";
import Doodles from "../../../public/data/doodles.json";



function TeamBar({doodleTeam, setFocusedMember}) {

    const TeamPreviewMember = ({curDoodle,isEdge}) =>{
        return(
            <button onClick={() => console.log("Clicked!")} className={`flex flex-1 justify-center items-center ${isEdge ? "" : "border-r-2"}`}>
            <Image
            className="h-fit"
              src={curDoodle === "-1" ? "images/question-mark-button-svgrepo-com.svg" : Doodles["DoodleData"][curDoodle]["ImgPath"]}
              width={55}
              height={55}
              alt="Currently Selected Doodle"
            />
          </button>
        )
    }

  return (
    <div className="w-full my-3 bg-stone-600 h-[6.25rem] rounded-xl border-2">
      <ul className="flex justify-evenly h-full w-full">
        <TeamPreviewMember curDoodle={doodleTeam[0]}/>
        <TeamPreviewMember curDoodle={doodleTeam[1]}/>
        <TeamPreviewMember curDoodle={doodleTeam[2]}/>
        <TeamPreviewMember curDoodle={doodleTeam[3]}/>
        <TeamPreviewMember curDoodle={doodleTeam[4]}/>
        <TeamPreviewMember isEdge={true} curDoodle={doodleTeam[5]}/>
      </ul>
    </div>
  );
}

export default TeamBar;
