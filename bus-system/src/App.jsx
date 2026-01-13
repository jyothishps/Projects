import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import BusList from "./pages/BusList";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/confirm" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
