import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Feed from "./components/Feed";
import Category from "./components/Category";
import Search from "./components/Search";
import Video from "./pages/Video";
import Channel from "./pages/Channel";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Feed />} />
            <Route path="/:category" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/channel" element={<Channel />} />
          </Route>
          <Route path="/video/:id" element={<Video />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
