import express from "express";

import { showEquipment, addEquipment, deleteEquipment, updateEquipment, equipmentBook, showEquipmentsBook, updateEquipmentBookStatus, deleteEquipmentInventory, } from '../Controllers/EquipmentController.js';

const router = express.Router();


router.get('/show', showEquipment);
router.post('/add', addEquipment);
router.delete('/delete/:id', deleteEquipment);
router.put('/update/:id', updateEquipment);
router.post('/book', equipmentBook);
router.get('/show-books', showEquipmentsBook);
router.put('/update-status/:id/:action/:name/:qty', updateEquipmentBookStatus);
router.delete('/delete-inventory/:id',deleteEquipmentInventory );


export default router;