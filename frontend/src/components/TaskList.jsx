import TaskCard from "./TaskCard";
import EmtyTask from "./EmtyTask";

const TaskList = ({ filterTasks }) => {

    //sắp xếp task
    const sortedTasks = [...filterTasks].sort((a, b) => (
        a.status === "completed"
    ) - (
            b.status === "completed"
        ));

    return (
        <div className="min-h-80 flex flex-col justify-start">
            {
            sortedTasks.length === 0 ? <EmtyTask /> :
            <div className="flex flex-col gap-4">
                {sortedTasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task} />
                ))}
            </div>
            }
        </div>
    );
};
export default TaskList;