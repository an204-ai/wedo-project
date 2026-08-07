import { BrowserRouter, Routes, Route} from "react-router";
import { Toaster, toast } from "sonner";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/Not-Found";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Navigate } from "react-router";

function App() {
  return (
    <>
    <Toaster richColors/>
      <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Private Routes */}
        <Route element={<ProtectedRoute/>}>
          <Route path="/homepage" element={<Homepage />}/>
        </Route>
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
