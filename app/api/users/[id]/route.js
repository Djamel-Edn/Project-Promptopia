import Post from "@models/post";
import { connectToDatabase } from "@utils/Database";
export const GET = async (req,{params}) => {

    try {
        await connectToDatabase();
        const posts=await Post.find({creator:params.id}).populate('creator');
      return new Response(JSON.stringify( posts ),{status:201});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }),{status:500});
    }
}