import {Input} from "./ui/input";
import {Card} from "./ui/card";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({handleAddNewTask}) => {
    const [taskTitle, setTaskTitle] = useState("");

    const addTask = async() => {
        //todo api
        if (taskTitle.trim()){
            try {
                await api.post("/task", {
                    title: taskTitle
                });
                toast.success("Thêm công việc thành công");
                handleAddNewTask();
            } catch (error) {
                console.log(error);
                toast.error("Lỗi khi thêm công việc");
            }
            setTaskTitle("");
        } else {
            toast.error("Vui lòng nhập tên công việc");
        }
        
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    }
    return (
        <Card>
            <div className="flex flex-col gap-2 mx-2 sm:flex-row">
                <Input 
                    type="text" 
                    placeholder="Có việc gì cần làm ?"
                    className="h-12 hover:border-primary hover:shadow-md transition-shadow duration-200"
                    value={taskTitle}
                    onChange={(event) => setTaskTitle(event.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <Button
                    variant="default"
                    className="px-6 h-12"
                    onClick={addTask}
                    disabled={!taskTitle.trim()}
                >
                    <Plus/>
                    Thêm
                </Button>
            </div>
        </Card>
    );
};
export default AddTask;