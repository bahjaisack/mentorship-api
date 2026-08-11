import User from "../models/users.js";
import { generateToken } from "../utility/generateToken.js";
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
export const getUserInfo = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("user not found");
  res.json(user);
};

export const createUser = async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  const saved = await user.save();
  res.status(201).json(saved);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send("user not found");
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send("server error");
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send("user not found");
    }
    res.send(`user with this${id} was deleted`);
  } catch (error) {
    res.status(500).send("server error");
  }
};
// register new user

export const register = async (req, res, next) =>{
  let {name,email,password} = req.body;
  try {
    email = email.toLowerCase();
    const exists = await User.findOne({ email});
    if(exists) return res.status(400).json({message: 'email is already in use'});
    const user = await User.create({name,password,email});
    const token = generateToken(user._id);
    res.status(201).json({token});
    
  } catch (err) {

    console.log("errror", err);
    next(err);
    
  }
}