import axios from 'axios';
import DeleteIcon from '../icons/DeleteIcon';
import DocumentIcon from '../icons/DocumentIcon';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tweet } from "react-tweet";

export interface ContentType {
  title: string;
  link: string;
  type: string;
  tags: string[];
  id: string;
  timeStamp : string;
  isDarkMode : boolean;
}

const ContentCard = ({ title, link, type, tags, id , timeStamp, isDarkMode }: ContentType) => {

  const deleteHandler = async (id : string) => {
    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/content`, {
      data: { contentId: id },

      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.status == 200) {
      return response.data.msg
    } else {
      throw new Error(response.data?.error)
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteHandler,
    onSuccess: () => {
      // refetch or update cache
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });

  return (
    <div className='flex flex-col items-center dark:bg-slate-800 dark:text-slate-100 break-inside-avoid  p-2 my-4 sm:p-4 gap-4 shadow-lg outline-2 outline-slate-200 dark:outline-slate-700 rounded-xl w-xs h-fit'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex justify-between gap-3'>
          <DocumentIcon />
          <h5 className='font-semibold text-lg'>{title}</h5>
        </div>
        <div className='flex justify-between gap-3'>
          {/* <div className='hover:cursor-pointer '><ShareIcon /></div> */}
          <div className='hover:cursor-pointer ' onClick={()=>{mutation.mutate(id)}} ><DeleteIcon /></div>
        </div>
      </div>
      {type === "Video" ? <iframe className='w-fit ' src={`https://www.youtube.com/embed/${link}`}
        title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> : ""}

      {type === "Tweet" ? (
  <div className={`w-full}`} data-theme={isDarkMode ? 'dark' : 'light'}>
    <Tweet id={link} />
  </div>
) : (
  ""
)}

      {type === "Image" ? <img className='h-50' src={link} alt="" /> : ""}
      {type === "Link" ? <a className='text-blue-600 break-words break-all line-clamp-2 ' target="_blank" href={link}>{link}</a> : ""}
      <div className='w-full'>
        <div className='flex gap-3 py-3'>
          {tags.map((tag: string, i: number) => <div key={i} className='px-2 py-0.5 rounded-2xl dark:bg-slate-700 dark:text-slate-100 bg-purple-200 text-purple-500 w-fit text-center'>#{tag}</div>)}
        </div>
        <div className=''>Added on {timeStamp}</div>
      </div>
    </div>
  )
}

export default ContentCard


