import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUsersWithCountPost
} from '../../controllers/v2/userController.js';

const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/post/count', getAllUsersWithCountPost);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
export default router;