 import userModel from "../models/userModel.js"
 import {  comparePassword, hashpassword } from "../helpers/authHelper.js"
 
 import JWT from 'jsonwebtoken'
import orderModel from "../models/orderModel.js";
 
 
 export const registercontroller = async(req, res)=>{
  try {
    const {name, email, password, phone, address, answer} = req.body;
    if(!name){
        return res.send({message:"name is required"})
    }

    if(!email){
        return res.send({message:"email is required"})
    }
    if(!password){
        return res.send({message:"password is required"})
    }
    if(!phone){
        return res.send({message:"phone is required"})
    }
    if(!address){
        return res.send({message:"address is required"})
    }
    if(!answer){
        return res.send({message:"answer is required"})
    }
    const existingUser = await userModel.findOne({email})
    if(existingUser){
        return res.status(404).send({
            success:false ,
            message: 'user is already exist , please login'})
    }
    const hashedPassword = await hashpassword(password);
    const user = await new userModel({
        name, email , password:hashedPassword , phone, address ,answer
    }).save();
    
    res.status(200).send({
        success:true,
        message:"User Register Successfully " ,
        user,
    })

}
  catch (error) {
    console.log(error)
    res.status(500).send({
        success : false ,
        message :"Error in Registration",}
    
    )
  }
 }

  export const loginController =async(req ,res)=>{
    try {
        const { email , password} =req.body ;
        if(!email || !password){
            return res.status(404).send({
                message: "invalid email or password" ,
                success:false ,
            })
        }
        const user =await userModel.findOne({email});
        if(!user){
            res.status(404).send({
                success:false ,
                message:" Email is not registered .Register first"
            })
        }
        const match = await comparePassword(password , user.password);
        if(!match){
            res.status(400).send({
                message: "invalid password"
            })
        }
        const token =   JWT.sign({_id: user._id} , process.env.JWT_SECRET ,
            {expiresIn: "45d"
            }
        );
        res.status(200).send({
            success:true ,
            message:"login Successfully" ,
            user:{
                _id : user._id ,
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token ,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"error is occured",
            success: false ,
        
        })
    }
  }
  export const testController =(req, res)=>{
    res.status(200).send({
        message:'protected route'
    })
  }
  //forgot password
  export const forgotPasswordController =async(req, res)=>{
try {
    const {email, answer ,newPassword}=req.body;
    if(!email){
        res.status(400).send({message:'email is required'})
    }
    if(!answer){
        res.status(400).send({message:'Answer is required'})
    }
    if(!newPassword){
        res.status(400).send({message:'New password is required'})
    }
    //check
    const user = await userModel.findOne({email ,answer})
    if(!user){
       return res.status(404).send({
            message:'wrong email or answer'
        })
    }
    const hashnewpass = await hashpassword(newPassword);
              await userModel.findByIdAndUpdate(user._id,{password:hashnewpass});
              res.status(200).send({
                success:true,
                message:"Password Reset Successfully"
              });
    
} catch (error) {
    console.log(error);
    res.status(500).send({
        message:'error occured in forget password',
        error
    })
}
  }

  //update prfole///////////////
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashpassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  //orders
  export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({createdAt: -1});
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status

  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };