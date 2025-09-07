import DocumentIcon from "../icons/DocumentIcon"
import LinksIcon from "../icons/LinksIcon"
import TagsIcon from "../icons/TagsIcon"
import TweetIcon from "../icons/TweetIcon"
import VideosIcon from "../icons/VideosIcon"
import SidebarElements from "./SidebarElements"
import brain from "../../assets/purplebrain.png"
import useMediaQuery from "../../hooks/useMediaQuery"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import TripleLine from "../icons/TripleLine"

const Sidebar = ({setType} : {setType : (type : string) => void}) => {
    const sidebarElements = [
      { text: "All", logo: <TagsIcon /> , value : "All" },
      { text: "Tweets", logo: <TweetIcon /> , value : "Tweet" },
      { text: "Videos", logo: <VideosIcon /> , value : "Video" },
      { text: "Images", logo: <DocumentIcon /> , value : "Image" },
      { text: "Links", logo: <LinksIcon /> , value : "Link" },
    ];
  
    const navigate = useNavigate();
    const [openSidebar, setOpenSidebar] = useState(false);
    const isDesktop = useMediaQuery("(min-width : 1024px)");
  
    useEffect(() => {
      setOpenSidebar(isDesktop);
    }, [isDesktop]);
  
    return (
      <>
        {/* Sidebar */}
        <div
          className={`
            fixed top-0 left-0 h-screen w-74 bg-white shadow-lg z-50 dark:bg-slate-800 dark:text-slate-100
            transform transition-transform duration-500 ease-in-out
            ${openSidebar ? "translate-x-0" : "-translate-x-full"}
            lg:sticky lg:translate-x-0 lg:w-74 lg:top-0
          `}
        >
          <div className="flex w-full justify-between pb-12 px-6 py-4">
            <div className="flex gap-4 items-center hover:cursor-pointer"  onClick={()=>{navigate('/')}}>
              <img src={brain} alt="" className="md:w-9 w-8 " />
              <h4 className="text-xl md:text-2xl font-semibold">Second Brain</h4>
            </div>
            {/* Sidebar toggle button (always visible on mobile, inside sidebar on desktop too) */}
            <div
              className="cursor-pointer lg:hidden"
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              <TripleLine />
            </div>
          </div>
  
          <div className="flex flex-col gap-4 items-center w-full">
            {sidebarElements.map((x, i) => (
              <SidebarElements text={x.text} logo={x.logo} value={x.value} key={i} setType={setType} setOpenSidebar={setOpenSidebar} />
            ))}
          </div>
        </div>
  
        {/* Toggle button when sidebar is closed (only on mobile) */}
        {!openSidebar && !isDesktop && (
          <div
            className="fixed top-4 left-4 z-50 cursor-pointer"
            onClick={() => setOpenSidebar(true)}
          >
            <TripleLine />
          </div>
        )}
      </>
    );
  };
  
  export default Sidebar;
  