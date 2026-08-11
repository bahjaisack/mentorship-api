import User from "../models/users.js";
import { generateToken } from "../utility/generateToken.js";

// register new user

export const register = async (req, res, next) =>{
  let {name,email,password,role,profilePic} = req.body;
  try {
    email = email.toLowerCase();
    const exists = await User.findOne({ email});
    if(exists) return res.status(400).json({message: 'email is already in use'});
    const user = await User.create({name,password,email,role,profilePic});
    const token = generateToken(user._id);
    res.status(201).json({token, user});
    
  } catch (err) {

    console.log("errror", err);
    next(err);
    
  }
}
// login

export const login = async(req, res, next) => {
    let {email, password} = req.body;
    const user = await User.findOne({ email });
    try {
        email = email.toLowerCase();
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message: "Invalid Email or Password"})
        }

        console.log("login info: ", user);
        const token = generateToken(user._id);
        res.json({token, user});
    } catch (err) {
        next(err)
    }
}