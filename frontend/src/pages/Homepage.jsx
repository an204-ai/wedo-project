import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilter from "@/components/StatandFilter";
import DateFilter from "@/components/DateFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import Footer from "@/components/Footer";
import { React } from "react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const Homepage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [pendingTaskCount, setPendingTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  //Logic
  const handlePageNext = () => {
    if(page < totalPages){
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePagePrev = () => {
    if(page > 1){
      setPage(prevPage => prevPage - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const fetchTask = async() => {
    try {
      const res = await api.get(`/task/?filter=${dateQuery}`);
      const data = res.data;
      setTaskBuffer(data.tasks);
      setCompletedTaskCount(data.completedTasks);
      setPendingTaskCount(data.pendingTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Lỗi khi truy xuất công việc")
    }
  };
  useEffect( () => {
    fetchTask();
  },[dateQuery]);

  const handleAddNewTask = () => {
    fetchTask();
  };

  const handleDeletedTask = () => {
    fetchTask();
  };

  const handleEditTask = () => {
    fetchTask();
  };

  //Biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'all':
        return task
      case 'pending':
        return task.status === 'pending'
      case 'completed':
        return task.status === 'completed'
      default:
        return task;
    }
  });

  const visibleTasks = filteredTasks.slice((
    page - 1) * visibleTaskLimit, page * visibleTaskLimit
  );

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (
    <div className="container pt-8 mx-auto">
        <div className="w-full max-w-2xl mx-auto space-y-4">
            <Header/>
            <AddTask handleAddNewTask={handleAddNewTask}/>
            <StatsAndFilter filter= {filter} setFilter={setFilter} completedTaskCout={completedTaskCount} pendingTaskCout={pendingTaskCount}/>
            <TaskList filterTasks={visibleTasks} filter={filter} handleDeleteTask={handleDeletedTask} handleEditTask={handleEditTask}/>
            <div className="flex justify-between items-center">
                <TaskListPagination handlePageNext={handlePageNext} handlePagePrev={handlePagePrev} handlePageChange={handlePageChange} totalPages={totalPages} page={page}/>
                <DateFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
            </div>
            <Footer completedTaskCount={completedTaskCount} pendingTaskCount={pendingTaskCount} />
        </div>
    </div>
  );
};

export default Homepage;