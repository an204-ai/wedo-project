import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilter from "@/components/StatandFilter";
import DateFilter from "@/components/DateFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { visibleTaskLimit } from "@/lib/data";
import Logout from "@/components/auth/Logout";
import useTaskStore from "@/stores/taskStore";


const Homepage = () => {
  const { tasks, completedTaskCount, pendingTaskCount, dateQuery, setDateQuery, getTasks } = useTaskStore();
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Fetch tasks khi component mount
  useEffect(() => {
    getTasks(dateQuery);
  }, []);

  //Logic phân trang
  const handlePageNext = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePagePrev = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //Biến
  const filteredTasks = tasks.filter((task) => {
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
    <div className="container pt-8 mx-auto sm:w-full sm:max-w-2xl">
      <div className="w-full max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <Header />
        <Logout />
        {/* AddTask */}
        <AddTask />

        {/* Stats and Filter */}
        <StatsAndFilter filter={filter} setFilter={setFilter} completedTaskCout={completedTaskCount} pendingTaskCout={pendingTaskCount} />

        {/* TaskList */}
        <TaskList filterTasks={visibleTasks} filter={filter} />

        <div className="flex justify-between items-center">
          {/* TaskListPagination */}
          <TaskListPagination handlePageNext={handlePageNext} handlePagePrev={handlePagePrev} handlePageChange={handlePageChange} totalPages={totalPages} page={page} />

          {/* DateFilter */}
          <DateFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
        </div>

        {/* Footer */}
        <Footer completedTaskCount={completedTaskCount} pendingTaskCount={pendingTaskCount} />
      </div>
    </div>
  );
};

export default Homepage;