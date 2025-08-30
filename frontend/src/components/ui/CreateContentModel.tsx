import { useRef, useState } from "react";
import Button from "./Button";
import PlusIcon from "../icons/PlusIcon";
import useOnClickOutside from "../../hooks/useonClickOutside";


const CreateContentModel = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (arg: boolean) => void }) => {
    const types: string[] = ['Image', 'Video', 'Article', 'Audio', 'Youtube', 'Tweet'];
    const [content, setContent] = useState({
        title: "",
        link: "",
        tags: [""],
        type: ""
    })
    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        if (isOpen) {
            setContent({
                title: "",
                link: "",
                tags: [""],
                type: ""
            })
            setIsOpen(false);
        }
    });
    return (
        <div>
            {isOpen && <div className='w-screen h-screen fixed top-0 left-0  bg-black/70 flex justify-center items-center'>
                <div ref={ref} className='rounded-xl p-4 bg-white flex flex-col gap-2 min-w-xs'>
                    <label htmlFor="title" className=''>Title</label>
                    <input id='title' type="text" className='bg-slate-200 rounded-lg px-2 py-1' onChange={(e) => { setContent(prev => ({ ...prev, title: e.target.value })) }} />
                    <label htmlFor="link" className=''>Enter Link</label>
                    <input id='link' type="text" className='bg-slate-200 rounded-lg px-2 py-1' onChange={(e) => { setContent(prev => ({ ...prev, link: e.target.value })) }} />
                    <label htmlFor="tags" className=''>Enter tags(separated by , )</label>
                    <input id='tags' type="text" className='bg-slate-200 rounded-lg px-2 py-1' placeholder='politics , development'
                        onChange={(e) => {
                            const tagsArray = e.target.value.split(",");
                            setContent(prev => ({ ...prev, tags: tagsArray }))
                        }} />
                    <label>Enter Type</label>
                    <div className="grid grid-cols-3 gap-3">
                        {types.map((type, i) => (<div key={i} className={`px-2 py-1 rounded-xl  text-black w-fit ${content.type === type ? "bg-blue-300" : "bg-slate-300"} `}
                            onClick={() => {
                                setContent(prev => ({ ...prev, type: type }))
                            }}>
                            {type}
                        </div>))}
                    </div>
                    <div className="flex justify-start gap-4 py-3">
                        <Button variant="primary" size="fit" text="Add Content" startIcon={<PlusIcon />}
                            onClick={() => { console.log("Button Clicked") }} />
                        <Button variant="destructive" size="fit" text="Cancel"
                            onClick={() => {
                                setContent({
                                    title: "",
                                    link: "",
                                    tags: [""],
                                    type: ""
                                })
                                setIsOpen(false)
                            }} />
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default CreateContentModel