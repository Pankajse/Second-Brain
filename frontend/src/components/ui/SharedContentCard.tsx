import DocumentIcon from '../icons/DocumentIcon';
import { Tweet } from 'react-tweet';

export interface ContentType {
    title: string;
    link: string;
    type: string;
    tags: string[];
    timeStamp : string;
}

const SharedContentCard = ({ title, link, type, tags,timeStamp }: ContentType) => {

    return (
        <div className='flex flex-col items-center dark:bg-slate-800 dark:text-slate-100 break-inside-avoid  p-2 my-4 sm:p-4 gap-4 shadow-lg outline-2 outline-slate-200 dark:outline-slate-700 rounded-xl w-xs h-fit'>
                <div className='flex w-full gap-3'>
                    <DocumentIcon />
                    <h5 className='font-semibold text-lg'>{title}</h5>
                </div>
            {type === "Video" ? <iframe className='w-fit ' src={`https://www.youtube.com/embed/${link}`}
                title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> : ""}

            {type === "Tweet" ? <div className="w-full">
                <Tweet id={link} />
            </div> : ""}

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

export default SharedContentCard


