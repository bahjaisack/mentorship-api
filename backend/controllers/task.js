import Task from "../models/Task.js";

export const createTask = async(req, res, next) => {
    try {
        const task = await Task.create({...req.body, createdBy: req.user._id})
        res.status(201).json(task)
    } catch (err) {
        next(err)
        
    }
}

export const getMyTasks = async(req, res, next) => {
    try {
        const tasks = await Task.find({createdBy: req.user._id}).sort({ 
createdAt: -1})
        res.json(tasks)
    } catch (err) {
        next(err)
        
    }
}

export const updateTask = async(req, res, next) => {
   try {
     const task = await Task.findOneAndUpdate(
        {_id: req.params.id, createdBy: req.user._id},
        req.body,
        {new: true}
    )
    if(!task) return res.status(404).json("task not found")
        res.json(task)
    
   } catch (err) {
    next(err)
    
   }
}

export const deleteTask = async(req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, createdBy: req.user._id},
            req.body
        )
        if(!task) return res.status(404).json("task not found")
            res.json({message: "task deleted"})
        
    } catch (err) {
        next(err)
        
    }
} 