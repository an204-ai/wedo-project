import { Card } from "./ui/card";
import {Calendar as CalendarIcon} from "lucide-react";

const taskBundle = [
    {
        "title": "Lập trình nodejs",
        "status": "active",
        "completedAt": null
        
    },
    {
        "title": "Đi chơi",
        "status": "completed",
        "completedAt": "2026-11-20T18:00:00"
        
    },
    {
        "title": "Xem phim",
        "status": "active",
        "completedAt": null
        
    },
];

const TaskList = () => {
    return (
        <div className="flex flex-col gap-4">
            {taskBundle.map((task,index) => (
            <Card 
            key={index}
            className="flex-row gap-2 p-3 justify-between items-center"
            >
                <div className="flex flex-col gap-2">
                    <p className="text-base font-semibold">{task.title}</p>
                    <div className="flex gap-2 items-center">
                        <CalendarIcon className="w-3 h-3"/>
                        <p className="text-xs">{new Date(task.completedAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <p className="text-xs">{task.status === "active" ? "Đang làm" : "Hoàn thành"}</p>
            </Card>
            ))}
        </div>
    );
};
export default TaskList;