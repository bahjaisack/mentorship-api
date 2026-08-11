import express from 'express'
import { register,login } from '../controllers/auth.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
const router = express.Router();

router.get('/admin', protect, authorize('admin'), (req, res)=>{
    res.json({message: `welcome to admin dashboard ${req.user.name}`})
})


export default router;