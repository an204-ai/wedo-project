import {Input} from "./ui/input";
import {Card} from "./ui/card";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

const AddTask = () => {
    return (
        <Card>
            <div className="flex flex-col gap-2 mx-2 sm:flex-row">
                <Input 
                    type="text" 
                    placeholder="Có việc gì cần làm ?"
                    className="h-12 hover:border-primary hover:shadow-md transition-shadow duration-200"
                />
                <Button
                    variant="default"
                    className="px-6 h-12"
                >
                    <Plus/>
                    Add Task
                </Button>
            </div>
        </Card>
    );
};
export default AddTask;