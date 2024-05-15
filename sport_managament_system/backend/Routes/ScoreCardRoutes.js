import express from "express";

import { showScoreCard, addScoreCard, updateScoreCard, showScoreCardById, deleteScoreCard, updateTeamName } from '../Controllers/ScoreCardController.js';

const router = express.Router();


router.get('/show', showScoreCard);
router.get('/show/:id', showScoreCardById);
router.post('/add', addScoreCard);
router.delete('/delete/:id', deleteScoreCard);
router.put('/update/livescore/:id', updateScoreCard);
router.put('/update/teamname/:id', updateTeamName);


export default router;