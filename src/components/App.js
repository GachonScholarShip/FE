import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainPage from "../pages/MainPage";
import RoadPage from "../pages/RoadPage";
import FloorPage from "../pages/FloorPage";
import LibraryPage from "../pages/LibraryPage";
import ConversationPage from "../pages/ConversationPage";

import styles from "./App.module.css";
import "./App.font.css";
function App() {
  return (
    <Router>
      <div className={styles.body}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/road" element={<RoadPage />} />
        </Routes>

        <Routes>
          <Route path="/floor" element={<FloorPage />} />
        </Routes>

        <Routes>
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/conversation" element={<ConversationPage />} />
          <Route path="/ar" element={<ARViewPage />} />
          <Route path="/map" element={<MapViewPage />} />
          <Route
            path="/library/centrallibrary"
            element={<CentralLibraryPage />}
          />
          <Route path="/library/eleclibrary" element={<ElecLibraryPage />} />

          {/* 관리자 페이지들 */}
          <Route path="/ua" element={<UserAccountPage />} />
          <Route path="/uaa" element={<UserAccountAddPage />} />
          <Route path="/uau/:userId" element={<UserAccountUpdatePage />} />

          <Route path="/bm" element={<BuildingManagementPage />} />
          <Route path="/bma" element={<BuildingManagementAddPage />} />
          <Route
            path="/bmu/:buildingId"
            element={<BuildingManagementUpdatePage />}
          />

          <Route path="/cm" element={<ClassroomManagementPage />} />
          <Route path="/cma" element={<ClassroomManagementAddPage />} />
          <Route
            path="/cmu/:classroomId"
            element={<ClassroomManagementUpdatePage />}
          />

          <Route path="/mu" element={<MudangiManagementPage />} />
          <Route path="/mua" element={<MudangiManagementAddPage />} />
          <Route
            path="/muu/:mudangiId"
            element={<MudangiManagementUpdatePage />}
          />

          <Route path="/rm" element={<RoadManagementPage />} />
          <Route path="/rma" element={<RoadManagementAddPage />} />
          <Route path="/rmu/:roadId" element={<RoadManagementUpdatePage />} />

          <Route path="/rvm" element={<RoadviewManagementPage />} />
          <Route path="/rvma" element={<RoadviewManagementAddPage />} />
          <Route
            path="/rvmu/:roadviewId"
            element={<RoadviewManagementUpdatePage />}
          />
        </Routes>

        <Routes>
          <Route path="/ar" element={<ARViewPage />} />
        </Routes>

        <Routes>
          <Route path="/map" element={<MapViewPage />} />
        </Routes>

        <Routes>
          <Route
            path="/library/centrallibrary"
            element={<CentralLibraryPage />}
          />
        </Routes>

        <Routes>
          <Route path="/library/eleclibrary" element={<ElecLibraryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
