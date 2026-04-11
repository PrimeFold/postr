import { useEffect, useState } from 'react'
import { fetchMyPosts } from '@/api/posts'
import Post from '@/components/posts'

interface PostData {
    _id: string
    title: string
    content: string
    author: string
    createdAt: string
}

const MyPosts = () => {
    const [posts, setPosts] = useState<PostData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchMyPosts()
                setPosts(data)
            } catch (error) {
                console.error('Failed to fetch posts:', error)
            } finally {
                setLoading(false)
            }
        }
        loadPosts()
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto max-w-5xl px-4 py-16">
                <p className="text-center text-sm text-muted-foreground">
                    Loading your posts...
                </p>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="container mx-auto max-w-5xl px-4 py-16 text-center">
                <p className="text-sm text-muted-foreground">
                    No posts yet. Create your first post!
                </p>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-5xl px-4 py-10">
            <h1 className="mb-8 text-3xl font-semibold tracking-tight">
                Your Posts
            </h1>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Post
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        content={post.content}
                        author={post.author}
                        createdAt={post.createdAt}
                    />
                ))}
            </div>
        </div>
    )
}

export default MyPosts