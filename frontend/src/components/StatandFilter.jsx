import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { filterType } from "@/lib/data.js";
import {Filter} from "lucide-react";

const StatsAndFilter = ({completedTaskCout = 0, activeTaskCout = 0, filter = "all"}) => {
    return (
        <div className="flex gap-3 justify-between items-center">
            <div className="flex gap-2">
               <Badge variant="secondary" className="bg-amber-100 text-amber-500">
                    {activeTaskCout} Active
               </Badge>
               <Badge variant="secondary" className="bg-emerald-200 text-lime-600">
                    {completedTaskCout} Completed
               </Badge>
            </div>
            <div className="flex gap-2">
               {Object.keys(filterType).map((type)=>(
                <Button 
                    key={type} 
                    size="sm" 
                    variant={filter === type ? "default" : "outline"}
                    className="capitalize"
                >
                    <Filter/>
                    {type}
                </Button>
               ))}
            </div>
        </div>
    );
};
export default StatsAndFilter;