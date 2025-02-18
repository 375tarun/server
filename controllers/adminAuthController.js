import userModel from "../models/userModel.js";
import { hashPasword ,comparePassword} from "../utils/authUtils.js";
import jwt from 'jsonwebtoken';

export const signup = async (req,res)=>{
    try {
        const {name , email, password, phone , role}= req.body;

        // validation
        if(!name){
            return res.send({error:"name is required"})
        }
        if(!email){
            return res.send({error:"email is required"})
        }
        if(!password){
            return res.send({error:"password is required"})
        }
        if(!phone){
            return res.send({error:"phone is required"})
        }
        // if(!role){
        //     return res.send({error:"role is required"})
        // }

        // validation for existing user 
        const existingUser = await userModel.findOne({email});

        if (existingUser) {
            return res.status.send({
                success:true,
                message: "user exist , please login"
            })
        }

        const hashedPassword = await hashPasword(password)
        const user = await new userModel({name,email,phone,role,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:"user created succesfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in signup',
            error
        })
    }
}
export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        
        // validation for data
        if (!email || !password) {
            return res.status(404).send({
                success:false,
                message:"incorrect email or password",
            })
        }
        // check for the user in db
        const user = await userModel.findOne({email})
        if (!user) {
            return res.status(404).send({
                success:false,
                message:"email not registered , please signup"
            })    
        }
        // check the password
        const  match = await comparePassword(password,user.password)
        if (!match) {
            return res.status(404).send({
                success:false,
            message:"incorrext password"            })
        }

        //jwt token for the login 
        const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})

        res.status(200).send({
            success:true,
            message:"user login successsfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role
            },
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
        
    }
}

export const logout = async (req,res)=>{}