import {Schema,models, model} from 'mongoose';

const userSchema=new Schema({
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:[true,'unique already exists'],
    },
    username:{
        type:String,
        required:[true,'Username is required'],
    },
    image:{
        type:String,
    },
})

const User= models.User || model('User',userSchema);
export default User;