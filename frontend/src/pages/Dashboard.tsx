import { useState } from "react"
import PlusIcon from "../components/icons/PlusIcon"
import ShareIcon from "../components/icons/ShareIcon"
import Button from "../components/ui/Button"
import ContentCard, { type ContentType } from "../components/ui/ContentCard"
import CreateContentModel from "../components/ui/CreateContentModel"
import Sidebar from "../components/ui/Sidebar"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function DashBoard() {
  const [createContentOpen, setCreateContentOpen] = useState(false);
  const [type, setType] = useState("All");
  const [shareBrainOpen, setShareBrainOpen] = useState(false);
  const onShareBrain = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/brain/share`, {
      share: true
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.status === 200) {
      const shareLink = `http://localhost:5173/shared/${response.data.link}`
      await navigator.clipboard.writeText(shareLink);
      setShareBrainOpen(true);
      setTimeout(() => {
        setShareBrainOpen(false);
      }, 3000);
    } else {
      throw new Error(response.data);
    }
  }
  const fetchContent = async (): Promise<ContentType[]> => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/content`, {
      headers: {
        Authorization: `$Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.status === 200) {
      return response.data.content;
    } else {
      throw new Error(response.data);
    }
  }

  const { data } = useQuery({
    queryKey: ["content"],
    queryFn: fetchContent,
  });

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <div className="flex dark:bg-slate-900 dark:text-slate-100 py-3">
        <Sidebar setType={setType} />
        <div className="w-full ">
          <CreateContentModel isOpen={createContentOpen} setIsOpen={setCreateContentOpen} />
          <div className="flex flex-col 2sm:flex-row justify-between w-full items-center p-2  sm:p-5">
            <h4 className="text-xl sm:text-3xl font-semibold sm:font-bold">All Notes</h4>
            <div className="flex flex-row gap-5 justify-end relative rounded-lg p-4">
              <Button variant="primary" size="fit" text="Add Content" startIcon={<PlusIcon />} onClick={() => { setCreateContentOpen(true) }} />
              <Button variant="secondary" size="fit" text="Share Brain" startIcon={<ShareIcon />} onClick={onShareBrain} />
              {shareBrainOpen && <div className=" p-2 absolute rounded-lg top-20 xs:top-15 text-green-500 bg-gray-200 text-sm  dark:bg-slate-700 dark:text-slate-200">Link Copied</div>}
            </div>
          </div>
          <div className="flex justify-center px-2  ">
            {data?.length === 0 ? <div className="text-2xl py-28 ">No Content Fount</div> : <div className=" column-1 sm:columns-2  xl:columns-3 gap-4">
              {data?.filter((content: ContentType) => { if (type === "All") return true; else return content.type === type }).map((content: ContentType, i: number) => <ContentCard key={i} {...content} />)}
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoard
