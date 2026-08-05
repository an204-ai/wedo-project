import { now } from "mongoose";
import Task from "../models/task.js";

export const getAllTask = async (req, res) => {
    const filter = req.query.filter || "all";
    let startDate = null;
    const now = new Date();
    switch (filter) {
        case 'today':
            {
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());            
                break;
            }
        case 'week':
            {
                const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
                startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
                break;
            }
        case 'month':
            {
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            }
        case 'year':
            {
                startDate = new Date(now.getFullYear(), 0, 1);
                break;
            }
        default:
            startDate = null;
            break;
    }
    
    const query = startDate ? {createdAt: {$gte: startDate}} : {}

    try {
        const result = await Task.aggregate([
            {$match: query},
            {$facet: {
                tasks: [{$sort: {createdAt: -1}}],
                pendingTasks: [{$match: {status: "pending"}}, {$count: "count"}],
                completedTasks: [{$match: {status: "completed"}}, {$count: "count"}],
            }} 
        ])
        const tasks = result[0].tasks;
        const pendingTasks = result[0].pendingTasks[0]?.count || 0;
        const completedTasks = result[0].completedTasks[0]?.count || 0;
        res.status(200).json({tasks, pendingTasks, completedTasks});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const createTask= async (req, res) => {
    const {title} = req.body;
    if(!title){
        return res.status(400).json({message: "Dữ liệu đầu vào không hợp lệ"});
    }
    try {
        const result = await Task.create({title});
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Lỗi hệ thống"});
    }
}

export const updateTask = async (req, res) => {
    const {title,status} = req.body;
    const id = req.params.id;
    try {
        const result = await Task.findByIdAndUpdate(id, {title,status}, {new: true});
        if(!result){
            return res.status(404).json({message: "Không tìm thấy task"});
        }
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Lỗi hệ thống"});
    }
}

export const deteleTask = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Task.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: "Không tìm thấy task"});
        }
        res.status(200).json({message: "Xóa task thành công"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Lỗi hệ thống"});
    }
}
