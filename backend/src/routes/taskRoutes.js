import express from "express";
import { getAllTask, createTask, updateTask, deteleTask } from "../controller/taskController.js";

const router = express.Router();

router.get('/', getAllTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deteleTask);

export default router;