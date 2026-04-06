import axios from 'axios'


interface PostProps {
  id:string;
  title:string;
  content:string;
  author:string;
  createdAt:string;
}


const Post = ({id,title,content,author,createdAt}:PostProps) => {

  const truncatedContent = content.length > 120 ? content.slice(0,120)+"...":content

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US",{
    month:"short",
    day:"numeric",
    year:"numeric"
  })


  return (
    <div className='bg-neutral-50 shadow-md shadow-neutral-400 rounded-lg p-6"'>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{truncatedContent}</p>
      <div className='flex items-center justify-between mt-auto'>
        {author && <span className='text-xs text-muted-foreground'>by{author}</span>}
        <span className='text-xs text-muted-foreground'>{formattedDate}</span>
      </div>
    </div>
  )
}

export default Post
