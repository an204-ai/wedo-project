import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster, toast } from "sonner";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/Not-Found";

function App() {
  return (
    <>
    <Toaster richColors/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
