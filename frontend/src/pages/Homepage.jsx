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
import Profile from "@/components/Profile";

const Homepage = () => {
  const { tasks, completedTaskCount, pendingTaskCount, dateQuery, setDateQuery, getTasks } = useTaskStore();
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Fetch tasks khi component mount
  useEffect(() => {
    getTasks(dateQuery);
  }, []);

  // Logic phân trang
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

  // Lọc task
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'all':
        return task;
      case 'pending':
        return task.status === 'pending';
      case 'completed':
        return task.status === 'completed';
      default:
        return task;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit, page * visibleTaskLimit
  );

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50">
      
      {/* SIDEBAR BÊN TRÁI */}
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 p-6 flex flex-col justify-between shrink-0 shadow-sm">
        <div className="space-y-6">
          {/* Logo & Header */}
          <Header />
          
          <hr className="border-slate-100" />
          
          {/* Profile User */}
          <Profile />
        </div>

        {/* Nút Đăng xuất ở góc dưới */}
        <div className="pt-6 border-t border-slate-100">
          <Logout />
        </div>
      </aside>

      {/* MAIN SECTION BÊN PHẢI */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl space-y-6 overflow-y-auto">
        {/* Ô thêm Task */}
        <AddTask />

        {/* Thống kê & Bộ lọc */}
        <StatsAndFilter 
          filter={filter} 
          setFilter={setFilter} 
          completedTaskCout={completedTaskCount} 
          pendingTaskCout={pendingTaskCount} 
        />

        {/* Danh sách Task */}
        <TaskList filterTasks={visibleTasks} filter={filter} />

        {/* Phân trang & Lọc ngày */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-2">
          <TaskListPagination 
            handlePageNext={handlePageNext} 
            handlePagePrev={handlePagePrev} 
            handlePageChange={handlePageChange} 
            totalPages={totalPages} 
            page={page} 
          />
          <DateFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
        </div>

        {/* Footer */}
        <Footer completedTaskCount={completedTaskCount} pendingTaskCount={pendingTaskCount} />
      </main>

    </div>
  );
};

export default Homepage;
