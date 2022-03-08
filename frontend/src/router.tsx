import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import LandingPage from "./pages/Home";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    )
}