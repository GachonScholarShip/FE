import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainPage from "../pages/MainPage";
import RoadPage from "../pages/RoadPage";
import FloorPage from "../pages/FloorPage";
import LibraryPage from "../pages/LibraryPage";
import ConversationPage from "../pages/ConversationPage";
import ARViewPage from "../pages/ARViewPage";
import MapViewPage from "../pages/MapViewPage";
import CentralLibraryPage  from "../pages/CentralLibraryPage";
import ElecLibraryPage  from "../pages/ElecLibraryPage";

import styles from "./App.module.css";
import "./App.font.css";

function App() {
  return (
    <Router>
      <div className={styles.body}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>

        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>

        <Routes>
          <Route path="/main" element={<MainPage />} />
        </Routes>

        <Routes>
          <Route path="/road" element={<RoadPage />} />
        </Routes>

        <Routes>
          <Route path="/building/:building/:floor" element={<FloorPage />} />
        </Routes>

        <Routes>
          <Route path="/library" element={<LibraryPage />} />
        </Routes>

        <Routes>
          <Route path="/conversation" element={<ConversationPage />} />
        </Routes>

        <Routes>
          <Route path="/ar" element={<ARViewPage />} />
        </Routes>

        <Routes>
          <Route path="/map" element={<MapViewPage />} />
        </Routes>

        <Routes>
          <Route path="/library/centrallibrary" element={<CentralLibraryPage />} />
        </Routes>

        <Routes>
          <Route path="/library/eleclibrary" element={<ElecLibraryPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
