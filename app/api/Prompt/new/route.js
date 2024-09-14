import Post from "@models/post";
import { connectToDatabase } from "@utils/Database";
export const POST = async (req) => {
    const { post, userId } =await req.json();
    console.log(post,"post")
    console.log(userId,"userId")
    try {
        await connectToDatabase();
        const newPost = await Post.create({
        ...post,
        creator: userId,
        });
      return new Response(JSON.stringify({ post: newPost }),{status:201});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }),{status:500});
    }
}