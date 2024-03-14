import Image from "next/image";
import Doodles from "../../../public/data/doodles.json";
import React, { useEffect, useState } from "react";

function TeamBar({ doodleTeam, setFocusedMember }) {

  const [buttonStates, setButtonStates] = useState([
    true,
    false,
    false,
    false,
    false,
    false
  ])

  const changeHighlighted = (buttonNumber) =>{
    let newState = []
    for(const button in buttonStates){
      console.log(Number(button))
      console.log(Number(buttonNumber))
      if(Number(button) === buttonNumber){
        newState.push(true)
      }else{
        newState.push(false)
      }
    }
    setButtonStates(newState)
  }

  const TeamPreviewMember = ({ curDoodle, isEdge, teamMemberNumber }) => {
    return (
      <button
        onClick={() => {setFocusedMember("Member" + teamMemberNumber); changeHighlighted(teamMemberNumber);}}
        className={`flex flex-1 justify-center items-center ${
          isEdge ? "" : "border-r-2"
        } ${ buttonStates[Number(teamMemberNumber)] ? "bg-stone-300" : ""}`}
        id={"Member" + teamMemberNumber}
      >
        <Image
          className="h-fit"
          src={
            curDoodle === null
              ? "images/question-mark-button-svgrepo-com.svg"
              : Doodles["DoodleData"][curDoodle]["ImgPath"]
          }
          width={55}
          height={55}
          alt="Currently Selected Doodle"
        />
      </button>
    );
  };

  return (
    <div className="w-full my-3 bg-stone-600 h-[6.25rem] rounded-xl border-2">
      <ul className="flex justify-evenly h-full w-full">
        <TeamPreviewMember curDoodle={doodleTeam.Member0.doodle} teamMemberNumber={0} />
        <TeamPreviewMember curDoodle={doodleTeam.Member1.doodle} teamMemberNumber={1} />
        <TeamPreviewMember curDoodle={doodleTeam.Member2.doodle} teamMemberNumber={2} />
        <TeamPreviewMember curDoodle={doodleTeam.Member3.doodle} teamMemberNumber={3} />
        <TeamPreviewMember curDoodle={doodleTeam.Member4.doodle} teamMemberNumber={4} />
        <TeamPreviewMember
          isEdge={true}
          curDoodle={doodleTeam.Member5.doodle}
          teamMemberNumber={5}
        />
      </ul>
    </div>
  );
}

export default TeamBar;
