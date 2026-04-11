import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface PostProps {
    id: string
    title: string
    content: string
    author: { _id: string; username: string } | string
    createdAt: string
}

const Post = ({ title, content, author, createdAt }: PostProps) => {
    const truncatedContent =
        content.length > 150 ? content.slice(0, 150) + '...' : content

    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })

    const authorName = typeof author === 'string' ? author : author?.username || 'Unknown'
    const authorInitial = authorName.charAt(0).toUpperCase()

    return (
        <div className="group flex flex-col rounded-xl border border-border/50 bg-card p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
            <h3 className="mb-2 text-lg font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {truncatedContent}
            </p>
            <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5 ring-1 ring-primary/10">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-medium">
                            {authorInitial}
                        </AvatarFallback>
                    </Avatar>
                    <span>{authorName}</span>
                </div>
                <span>{formattedDate}</span>
            </div>
        </div>
    )
}

export default Post
