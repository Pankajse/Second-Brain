import { useState } from "react"
import { type ContentType } from "../components/ui/ContentCard"
import Sidebar from "../components/ui/Sidebar"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import SharedContentCard from "../components/ui/SharedContentCard"
import { useParams } from "react-router-dom"
import useDarkMode from "../hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

function SharedBrain() {
    const { shareId } = useParams();
    const [username, setUsername] = useState("")
    const [type, setType] = useState("All");
     const [isDarkMode, toggleDarkMode] = useDarkMode();
    const fetchContent = async (): Promise<ContentType[]> => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/brain/${shareId}`);
        if (response.status === 200) {
            setUsername(response.data.username);
            return response.data.content;
        } else {
            throw new Error(response.data);
        }
    }

    const { data } = useQuery({
        queryKey: ["sharedContent"],
        queryFn: fetchContent,
    });

    return (
        <>
            <div className="flex  dark:bg-slate-900 dark:text-slate-100 ">
                <Sidebar setType={setType} />
                {/* Toggle Dark Mode */}
                <div className="absolute top-4 right-4">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full bg-purple-600 text-white shadow-md"
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
                <div className="w-full ">
                    <h4 className="text-2xl sm:text-3xl font-semibold sm:font-bold text-center w-full py-5 ">Username : {username}</h4>
                    <div className="flex justify-center px-2 ">
                        {data?.length === 0 ? <div className="text-2xl py-28 ">No Content Fount</div> : <div className=" column-1 sm:columns-2  xl:columns-3 gap-4">
                            {data?.filter((content: ContentType) => { if (type === "All") return true; else return content.type === type }).map((content: ContentType, i: number) => <SharedContentCard key={i} {...content} />)}
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SharedBrain
