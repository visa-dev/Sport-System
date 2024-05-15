import express from "express";

import { showSport, addSport, deleteSport, updateSport } from '../Controllers/SportController.js';

const router = express.Router();


router.get('/show', showSport);
router.post('/add', addSport);
router.delete('/delete/:id', deleteSport);
router.put('/update/:id', updateSport);



export default router;