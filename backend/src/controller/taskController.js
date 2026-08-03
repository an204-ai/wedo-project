import Task from "../models/task.js";

export const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
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
