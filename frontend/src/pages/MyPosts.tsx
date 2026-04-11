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

    if (loading) return <div className="p-8">Loading your posts...</div>

    if (posts.length === 0) return <div className="p-8">No posts yet. Create your first post!</div>

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold mb-6">Your Posts</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </main>
    )
}

export default MyPosts
