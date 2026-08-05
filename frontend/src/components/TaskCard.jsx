import React from 'react'
import {Card} from "./ui/card";
import {Calendar as CalendarIcon, Circle, Pencil, Trash, CheckCircle2} from "lucide-react";
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Input } from './ui/input';
import api from "@/lib/axios";
import { toast } from "sonner";
import {statusList} from '@/lib/data.js';

const TaskCard = ({index, task, handleDeletedTask, handleEditTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title);
    const [isCompleted, setIsCompleted] = useState(task.status);

    //Hàm xóa task
    const deleteTask = async (taskId) => {
        try{
            await api.delete(`/task/${taskId}`);
            toast.success("Xóa task thành công");
            handleDeletedTask();
            setIsEditing(false);
        }catch(error){
            toast.error("Lỗi khi xóa task");
            console.log(error);
        }
    }
    //Hàm sửa task
    const editTask = async (taskId, title) => {
        try{
            await api.put(`/task/${taskId}`, {title});
            toast.success("Sửa task thành công");
            handleEditTask();
            setIsEditing(false);
        }catch(error){
            toast.error("Lỗi khi sửa task");
            console.log(error);
        }
    }

    //Hàm hoàn thành task
    const toggleTaskStatus = async (taskId, currentStatus) => {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        try{
            await api.put(`/task/${taskId}`, {status: newStatus});
            toast.success(`Đã chuyển task thành ${statusList[newStatus]}`);
            handleEditTask();
            setIsEditing(false);
        }catch(error){
            toast.error("Lỗi khi chuyển trạng thái task");
            console.log(error);
        }
    }
    //Hàm xử lý khi ấn enter
    const handleonKeyPress = (e) => {
        if(e.key === "Enter"){
            editTask(task._id, updateTaskTitle); 
        }
    }
  return (
    <Card
        key={index}
        className={cn(
            "flex flex-row items-center gap-3 px-3 py-2  group rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md",
            task.status === "completed"
            ? "opacity-60 bg-green-100"
            : "bg-white hover:border-primary/40"
        )}
    >
        {/*Nút chọn hoàn thành*/}
        <Button 
            variant="ghost"
            onClick={() => toggleTaskStatus(task._id, task.status)}
        >
            {
                task.status === 'completed' ? 
                <CheckCircle2/>
                : 
                <Circle/>
            }
        </Button>
        {/*Thẻ hiện tiêu đề và chỉnh sửa tiêu đề*/}
        <div className='flex flex-col gap-1 w-full'>
        {
                isEditing ? 
                <Input
                value={updateTaskTitle}
                placeholder="Cần phải làm gì"
                onChange={(event) => {
                    setUpdateTaskTitle(event.target.value);
                }}
                onBlur={() => {
                    setIsEditing(false);
                    setUpdateTaskTitle(task.title || "");
                }}
                onKeyPress={(e) => {
                    handleonKeyPress(e); 
                }}
                className={cn(
                    "text-sx text-primary h-8 text-sm px-2 border-gray-200"
                )}
                > 
                </Input>
                :
                <p className='text-md font-semibold'>
                    {task.title}
                </p>
            }
            <div className='flex gap-2 items-center'>
                <span className='flex gap-2 items-center text-xs'>
                    <CalendarIcon className="text-muted-foreground size-3"/>
                </span>
                <span className="text-muted-foreground">
                    {new Date(task.createdAt).toLocaleDateString("vi-VN")}
                </span>
                {
                    task.completedAt && 
                    <>
                        <span className='flex gap-2 items-center text-xs'>
                            <CalendarIcon className="text-muted-foreground size-3"/>
                        </span> -
                        <span className="text-muted-foreground">
                            {new Date(task.completedAt).toLocaleDateString("vi-VN")}
                        </span>
                    </> 
                }
            </div>
        </div>
            
        {/*Thẻ nút sửa và xóa*/}
        <div className='hidden gap-3 group-hover:inline-flex animate-slide-up  '>
            <Button
                variant="ghost"
                size="icon"
                className='h-8 w-8 p-0'
                onClick={() => {
                    setIsEditing(true);
                    setUpdateTaskTitle(task.title || "");
                }}
            >
                <Pencil className='size-4'/>
            </Button>
            <Button
                variant="ghost"
                size='icon'
                onClick={()=>deleteTask(task._id)}
                className={cn(
                    "hover:bg-red-500 hover:text-white h-8 w-8 p-0",
                )}
            >
                <Trash className='size-4'/>
            </Button>
        </div>
    </Card>
  )
}

export default TaskCard