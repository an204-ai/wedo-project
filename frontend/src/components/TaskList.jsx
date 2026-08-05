import TaskCard from "./TaskCard";
import EmtyTask from "./EmtyTask";
const TaskList = ({filterTasks, handleDeleteTask, handleEditTask}) => {
    return (
        <>
        {
            filterTasks.length === 0 ? <EmtyTask/> : 
            <div className="flex flex-col gap-4">
                {filterTasks.map((task) => (
                    <TaskCard key={task._id} task={task} handleDeletedTask={handleDeleteTask} handleEditTask={handleEditTask}/>
                ))}
            </div>
        }
        </>
    );
};
export default TaskList;