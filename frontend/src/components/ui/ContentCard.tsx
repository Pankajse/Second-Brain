import DeleteIcon from '../icons/DeleteIcon';
import DocumentIcon from '../icons/DocumentIcon';
import ShareIcon from '../icons/ShareIcon';

const ContentCard = () => {
  const tags = ["development", "politics"]
  return (
    <div className='flex flex-col items-center m-10 p-4 gap-4 shadow-lg outline-2 outline-slate-200 rounded-xl w-xs '>
      <div className='flex justify-between items-center w-full'>
        <div className='flex justify-between gap-3'>
          <DocumentIcon />
          <h5 className='font-semibold text-lg'>Project Ideas</h5>
        </div>
        <div className='flex justify-between gap-3'>
          <ShareIcon />
          <DeleteIcon />
        </div>
      </div>
      <iframe className='w-fit ' src="https://www.youtube.com/embed/bABjxnislXk?si=92i-zuCyv2qAGhVn"
        title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        
      {/* <div className="w-full">
        <blockquote className="twitter-tweet"> <a href="https://twitter.com/TimesAlgebraIND/status/1961445747913855459"></a></blockquote>
      </div> */}
      <div className='w-full'>
        <div className='flex gap-3 py-3'>
          {tags.map((tag, i) => <div key={i} className='px-2 py-0.5 rounded-2xl bg-purple-200 text-purple-500 w-fit text-center'>{tag}</div>)}
        </div>
        <div className='text-gray-800'>Added on 13/04/2025</div>
      </div>
    </div>
  )
}

export default ContentCard


