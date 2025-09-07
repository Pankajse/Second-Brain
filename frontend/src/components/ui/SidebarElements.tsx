import {type ReactElement} from "react";

interface SidebarElementsProps {
    text : string;
    logo : ReactElement,
    value : string,
    setType : (type : string) => void,
    setOpenSidebar : (type : boolean) => void;
}

const SidebarElements = (props : SidebarElementsProps) => {
  return (
    <div className="w-full flex items-center hover:bg-slate-200 dark:hover:bg-slate-700 pl-4 px-1 py-1 rounded-lg  "
    onClick={() =>{ props.setType(props.value); props.setOpenSidebar(false)}}
    >
        <div className="pr-5">{props.logo}</div>
        <div className="text-lg ">{props.text}</div>
    </div>
  )
}

export default SidebarElements