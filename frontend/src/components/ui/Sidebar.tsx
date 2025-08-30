import DocumentIcon from "../icons/DocumentIcon"
import LinksIcon from "../icons/LinksIcon"
import TagsIcon from "../icons/TagsIcon"
import TweetIcon from "../icons/TweetIcon"
import VideosIcon from "../icons/VideosIcon"
import SidebarElements from "./SidebarElements"

const Sidebar = () => {
    const sidebarElements = [{
        text: "Tweets",
        logo: <TweetIcon />
    },
    {
        text: "Videos",
        logo: <VideosIcon />
    },
    {
        text: "Documents",
        logo: <DocumentIcon />
    },
    {
        text: "Links",
        logo: <LinksIcon />
    },
    {
        text: "Tags",
        logo: <TagsIcon />
    },]
    return (
        <div className="px-6 py-4 shadow-lg min-w-2xs h-screen">
            <div className="flex justify-start gap-4 pb-12">
                <img src="https://pngimg.com/uploads/brain/brain_PNG93.png" alt="" className="w-9 " />
                <h4 className="text-2xl font-semibold">Second Brain</h4>
            </div>
            <div className="flex flex-col gap-4 items-center w-fit">
                {sidebarElements.map((x,i)=> <SidebarElements text={x.text} logo={x.logo} key={i} />)}
            </div>
        </div>
    )
}

export default Sidebar