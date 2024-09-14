import Post from "@models/post";
import { connectToDatabase } from "@utils/Database";

export const GET = async (req,{params}) => {
    try {
        await connectToDatabase();
        const post=await Post.findById(params.id).populate('creator');
        if (!post){
            return new Response(JSON.stringify({ error: "Post not found" }),{status:404});
        }
      return new Response(JSON.stringify( post ),{status:201});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }),{status:500});
    }
}
export const PATCH = async (req,{params}) => {
    const { prompt, tag } =await req.json();
    try {
        await connectToDatabase();  
        const existingPost=await Post.findById(params.id);
        if (!existingPost){
            return new Response(JSON.stringify({ error: "Post not found" }),{status:404});
        }
        existingPost.prompt=prompt;
        existingPost.tag=tag;
        await existingPost.save();
      return new Response(JSON.stringify( existingPost ),{status:200});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }),{status:500});
    }
}
export const DELETE = async (req,{params}) => {
    try{
        await connectToDatabase();
         
        await Post.findByIdAndDelete(params.id);
        return new Response(JSON.stringify({ message: "Post deleted" }),{status:200});

    }catch(error){
        console.log(error);
        return new Response(JSON.stringify({ error: error.message }),{status:500});
    }
}