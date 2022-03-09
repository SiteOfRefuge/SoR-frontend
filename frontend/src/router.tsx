import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import About from "./pages/About";

import Home from "./pages/Home";
import CanOfferShelter from "./pages/Signup/CanOfferShelter";
import NeedShelter from "./pages/Signup/NeedShelter";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Unprotected routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* Routes that should be accessble only for unautentified users */}
                <Route path="/signup/need-shelter" element={<NeedShelter />} />
                <Route path="/signup/offer-shelter" element={<CanOfferShelter />} />
                {/* Protected routes */}
            </Routes>
        </BrowserRouter>
    )
}