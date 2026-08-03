import imgNotFound from "../assets/not-found.jpg"
import { Link } from "react-router";
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <img
                className="w-[50%] h-[50%]"
                src={imgNotFound} alt="not-found"
            />
            <p className="text-[32px] font-bold mt-5 text-gray-950">Đi lạc rồi bạn ơi !!!</p>
            <Link to="/" className="text-[20px] cursor-pointer">
                <button className="mt-5 py-2 px-4 rounded-md border-2 border-primary-500 hover:bg-stone-900 hover:text-white transition-colors duration-200">Quay về nhà</button>
            </Link>
        </div>
    );
};
export default NotFound;