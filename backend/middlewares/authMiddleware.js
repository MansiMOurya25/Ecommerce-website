
import  JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';


export const requireSignIn = async(req, res ,next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization , process.env.JWT_SECRET);
         req.user = decode;
         next();

    } catch (error) {
        console.log(error)
        res.status(404).send({
            message:'error in test '
        })
    } }

    //Admin

    export const adminCheck =async(req ,res ,next)=>{
       try {
            const user = await userModel.findById(req.user._id)
            if( user.role !== 1){
                res.status(400).send({
                 message: "UnAuthorized User only Admin allowed.",
                 success :false
                })
            }
            else{
                next();
            }
        } catch (error) {
        res.status(404).send({
            message: 'error in admin',
            success : false
        } 
    )
       }
    }