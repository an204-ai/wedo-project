import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import useTaskStore from "@/stores/taskStore";

const AddTask = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const { addTask } = useTaskStore();

    const handleAddTask = async () => {
        if (taskTitle.trim()) {
            await addTask(taskTitle);
            setTaskTitle("");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleAddTask();
        }
    };

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
                    onClick={handleAddTask}
                    disabled={!taskTitle.trim()}
                >
                    <Plus />
                    Thêm
                </Button>
            </div>
        </Card>
    );
};
export default AddTask;