import { useState } from "react"
import PlusIcon from "./components/icons/PlusIcon"
import ShareIcon from "./components/icons/ShareIcon"
import Button from "./components/ui/Button"
import ContentCard from "./components/ui/ContentCard"
import CreateContentModel from "./components/ui/CreateContentModel"
import Sidebar from "./components/ui/Sidebar"

function App() {
  const [createContentOpen, setCreateContentOpen] = useState(false);

  return (
    <>
      <div className="flex ">
        <Sidebar />
        <div className="w-full">
          <CreateContentModel isOpen={createContentOpen} setIsOpen={setCreateContentOpen} />
          <div className="flex justify-between w-full items-center p-5">
            <h4 className="text-3xl font-bold">All Notes</h4>
            <div className="flex gap-5 justify-end p-4">
              <Button variant="primary" size="fit" text="Add Content" startIcon={<PlusIcon />} onClick={() => { setCreateContentOpen(true) }} />
              <Button variant="secondary" size="fit" text="Share Brain" startIcon={<ShareIcon />} onClick={() => { console.log("Button Clicked") }} />
            </div>
          </div>
          <ContentCard />
        </div>
      </div>
    </>
  )
}

export default App
