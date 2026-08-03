import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilter from "@/components/StatandFilter";
import DateFilter from "@/components/DateFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import Footer from "@/components/Footer";
import { React } from "react";
const Homepage = () => {
  return (
    <div className="container pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
            <Header/>
            <AddTask/>
            <StatsAndFilter/>
            <TaskList/>
            <div className="flex flex-col justify-between items-center">
                <TaskListPagination/>
                <DateFilter/>
            </div>
            <Footer/>
        </div>
    </div>
  );
};

export default Homepage;