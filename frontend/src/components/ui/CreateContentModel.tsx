import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import PlusIcon from "../icons/PlusIcon";
import useOnClickOutside from "../../hooks/useonClickOutside";
import axios from "axios";
import type { ContentType } from "./ContentCard";

type PostContent = Omit<ContentType,'id' | 'timeStamp'>


const CreateContentModel = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (arg: boolean) => void }) => {
    const types: string[] = ['Image', 'Video', 'Link', 'Tweet'];
    const [content, setContent] = useState({
        title: "",
        link: "",
        tags: [""],
        type: ""
    })
    const [tagString, setTagString] = useState("")
    const [showMsg, setShowMsg] = useState(false);
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

    const postContent = async (content: PostContent) => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/content`, content, {
            headers: {

                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status == 200) {
            setContent({
                title: "",
                link: "",
                tags: [""],
                type: ""
            });
            setTagString("");
            return response.data.content;
        } else {
            throw new Error(response.data);
        }
    };

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: postContent,
        onSuccess: () => {
            // refetch or update cache
            queryClient.invalidateQueries({ queryKey: ["content"] });
        },
    });


    useEffect(() => {
        if (mutation.isSuccess) {
            setShowMsg(true);
            setTimeout(() => {
                setShowMsg(false);
            }, 3000);
        }

    }, [mutation.isSuccess])


    return (
        <div className="">
            {isOpen && <div className='w-screen h-screen fixed top-0 left-0  flex justify-center items-center z-50'>
                <div className="absolute  inset-0 bg-black opacity-70"></div>
                <div ref={ref} className='relative rounded-xl p-2 xs:p-4 bg-white dark:bg-slate-800 dark:text-slate-100 flex flex-col gap-2 max-w-md min-w-xs sm:w-[90%]'>
                    <label htmlFor="title" className=''>Title</label>
                    <input id='title' type="text" value={content.title} className='bg-slate-100 rounded-lg px-2 py-1' onChange={(e) => { setContent(prev => ({ ...prev, title: e.target.value })) }} />
                    <label htmlFor="link" className=''>Enter Link</label>
                    <input id='link' type="text" value={content.link} className='bg-slate-100 rounded-lg px-2 py-1' onChange={(e) => { setContent(prev => ({ ...prev, link: e.target.value })) }} />
                    <label htmlFor="tags" className=''>Enter tags(separated by , )</label>
                    <input id='tags' type="text" value={tagString} className='bg-slate-100 rounded-lg px-2 py-1' placeholder='politics , development'
                        onChange={(e) => {
                            setTagString(e.target.value);
                            const tagsArray = e.target.value.split(",");
                            setContent(prev => ({ ...prev, tags: tagsArray }))
                        }} />
                    <label>Enter Type</label>
                    <div className="grid grid-cols-4 gap-3">
                        {types.map((type, i) => (<div key={i} className={`px-2 py-1 rounded-xl  text-black w-fit ${content.type === type ? "bg-blue-200" : "bg-slate-100"} `}
                            onClick={() => {
                                setContent(prev => ({ ...prev, type: type }))
                            }}>
                            {type}
                        </div>))}
                    </div>
                    {mutation.isError && <p className="text-red-600">Error adding Content</p>}
                    {showMsg && <p className={`text-green-500 `}>Content added successfully!</p>}
                    <div className="flex justify-start gap-4 py-3">
                        <Button variant="primary" size="fit" disabled={mutation.isPending} text={`${mutation.isPending ? "Adding..." : "Add Content"}`} startIcon={<PlusIcon />}
                            onClick={() => { mutation.mutate(content) }} />
                        <Button variant="destructive" size="fit" text="Cancel"
                            onClick={() => {
                                setContent({
                                    title: "",
                                    link: "",
                                    tags: [],
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