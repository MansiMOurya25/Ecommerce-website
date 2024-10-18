import slugify from "slugify";
import categoryModel from "../models/CategoryModel.js";

export const createCategoryController =async(req, res)=>{
try {
    const {name} = req.body;
    if(!name){
        return res.status(401).send({message:'Name is Required'})
    }
    const existingCategory = await categoryModel.findOne({name})
    if(existingCategory){

        return res.status(200).send({
            success:true ,
            message :"Category Already exist"
        })
    }
    const category = await new categoryModel({name , slug:slugify(name)}).save();
    res.status(201).send({
        success: true,
        message :'Category created',
        category,
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in Category',
        error
    })
}
};

//update category
export const updateCategoryController =async(req,res)=>{
 try {
    const {name} = req.body;
    const {id} = req.params
    const category = await categoryModel.findByIdAndUpdate(id , {name , slug:slugify(name)},
        {new :true}
    )
    res.status(200).send({
        success :true ,
        message: 'Category updated Successfully' ,
        category,
    })
 } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message: 'error while updating category',
        error
    })
 }
}
//get all category
export const getAllCategoryController =async(req, res)=>{
    try {
        const category = await categoryModel.find({})
         res.status(200).send({
            success:true,
            message: 'Successfull get Category',
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error While get all category' ,
            error
        })
    }

}
//single category
export const singleCategoryController =async(req, res)=>{
try {
    const category = await categoryModel.findOne({slug:req.params.slug})
    res.status(200).send({
        success:true,
        message: 'Get single category' ,
        category})
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message: 'Error While get single category' ,
        error
})
}}
export const deleteCategoryController =async(req,res)=>{
 try {
    const {id} = req.params
     await categoryModel.findByIdAndDelete(id);
     res.status(200).send({
        success:true,
        message:'Successfully Deleted',
     })
 } catch (error) {
    res.status(500).send({
        success:false,
        message: 'Error While delete single category' ,
        error
})
 }   
}

