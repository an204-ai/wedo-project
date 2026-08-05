import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { filterType } from "@/lib/data.js";
import {Filter} from "lucide-react";

const StatsAndFilter = ({completedTaskCout = 0, pendingTaskCout = 0, filter, setFilter}) => {
    return (
        <div className="flex gap-3 justify-between items-center">
            <div className="flex gap-2">
               <Badge variant="secondary" className="bg-amber-100">
                    {pendingTaskCout} {filterType.pending}
               </Badge>
               <Badge variant="secondary" className="bg-emerald-200">
                    {completedTaskCout} {filterType.completed}
               </Badge>
            </div>
            <div className="flex gap-2">
               {Object.entries(filterType).map(([key, value])=>(   
                <Button 
                    key={key} 
                    size="sm" 
                    onClick={() => setFilter(key)}
                    variant={filter === key ? "default" : "outline"}
                    className="capitalize"
                >
                    <Filter/>
                    {value}
                </Button>
               ))}
            </div>
        </div>
    );
};
export default StatsAndFilter;