import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUsersWithCountPost
} from '../../controllers/v1/userController.js';

const router = express.Router();
router.get('/', getAllUsers);
router.get('/post/count', getAllUsersWithCountPost);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
export default router;