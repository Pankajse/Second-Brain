import {type ReactElement} from "react";

interface SidebarElementsProps {
    text : string;
    logo : ReactElement
}

const SidebarElements = (props : SidebarElementsProps) => {
  return (
    <div className="w-full flex hover:bg-slate-200 px-3 py-1 rounded-lg  ">
        <div className="pr-5">{props.logo}</div>
        <div className="text-lg ">{props.text}</div>
    </div>
  )
}

export default SidebarElements