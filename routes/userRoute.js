import express from 'express';
import {
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
} from '../controllers/userCont.js';
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from '../utilits/verifyToken.js';

const router = express.Router();

//UPDATE
router.put('/update/:id', verifyUser, updateUser);
//DELETE
router.delete('/delete/:id', verifyAdmin, deleteUser);
//GET
router.get('/getuser/:id', verifyUser, getUser);
//GET ALL
router.get('/getallusers', getAllUser);
// verifyAdmin
export default router;
