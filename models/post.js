import {Schema,models, model} from 'mongoose';
const postSchema=new Schema({
    prompt:{
        type:String,
        required:[true,'Prompt is required'],
    },
    tag:{
        type:String,
        required:[true,'Tag is required'],
    },
    creator:{
       type: Schema.Types.ObjectId,
         ref: 'User',
    },
    createdAt: { type: Date, default: Date.now }
})

const Post= models.Post || model('Post',postSchema);
export default Post;