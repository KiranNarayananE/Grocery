import bcrypt from "bcrypt";
import productModel from "../model/productSchema.js";
import adminModel from "../model/adminSchema.js";
import { generateToken } from "../middleware/auth.js";



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({ email: email});

    if (!admin) return res.status(201).json({ message: "Invalid Email " });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(202).json({ message: "Incorrect Password " });
    const { _id, name } = admin;

    const token = generateToken(_id,"admin");
    res.status(200).json({ token: token, name: name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProduct = async (req, res, next) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ status: "success", result: products});
    } catch (error) {
        res.status(200).json({ status: "failed", message: error.message });
    }
};
export const addProduct = async (req, res, next) => {
try {
    const { name, quantity,category,imagePreview,price} = req.body;
    const isProduct=await productModel.findOne({name:name})
    if(isProduct){
         res.sendStatus(202)
    }
    else{
    const newProduct = new productModel({
      name,
      quantity,
      category,
      price,
      image: imagePreview,
    });
    await newProduct.save();
    res.sendStatus(200);
}
  } catch (error) {
    res.sendStatus(500);
     console.log(error.message);
  }
}
export const deleteProduct = async (req, res, next) => {
    try {
        const { id} = req.query
       let deleteAccount= await productModel.deleteOne({ _id: id });
       if(deleteAccount.deletedCount==1){
        const products = await productModel.find({});
        res.status(201).json({products});
       }
    }
       catch (error) {
        res.sendStatus(500);
         console.log(error.message);
      }
    }
