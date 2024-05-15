import express from "express";
import { showCoatch, addCoatch, deleteCoatch, updateCoatch } from '../Controllers/CoatchController.js';

const router = express.Router();

router.get('/show', showCoatch);
router.post('/add',addCoatch);
router.delete('/delete/:id', deleteCoatch);
router.put('/update/:id', updateCoatch);


export default router;