import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
        // unique:true
    },
// with using slug we can change white space to - or _ for example we wrote men wear so it will change men_wear or men-wear like that.
    slug:{
        type:String,
        lowercase:true
    }
})
 export default mongoose.model('Category' ,categorySchema)
