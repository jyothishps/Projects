import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import MovieList from "./pages/MovieList";
import BookMovies from "./pages/BookMovies";
import Confirmation from "./pages/Confirmation";

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search/>} />
        <Route path="/movies" element={<MovieList/>} />
        <Route path="/booking" element={<BookMovies/>} />
        <Route path="/confirm" element={<Confirmation/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;