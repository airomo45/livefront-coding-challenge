import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="" element={<ListPage />} />
        <Route path="/details/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
