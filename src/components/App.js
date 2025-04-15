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
import CentralLibraryPage from "../pages/CentralLibraryPage";
import ElecLibraryPage from "../pages/ElecLibraryPage";
import UserAccountPage from "../pages/manager_pages/UserAccountPage";
import UserAccountAddPage from "../pages/manager_pages/UserAccountAddPage";
import UserAccountUpdatePage from "../pages/manager_pages/UserAccountUpdatePage";
import BuildingManagementPage from "../pages/manager_pages/BuildingManagementPage";
import BuildingManagementAddPage from "../pages/manager_pages/BuildingManagementAddPage";
import BuildingManagementUpdatePage from "../pages/manager_pages/BuildingManagementUpdatePage";
import ClassroomManagementPage from "../pages/manager_pages/ClassroomManagementPage";
import ClassroomManagementAddPage from "../pages/manager_pages/ClassroomManagementAddPage";
import ClassroomManagementUpdatePage from "../pages/manager_pages/ClassroomManagementUpdatePage";
import MudangiManagementPage from "../pages/manager_pages/MudangiManagementPage";
import MudangiManagementAddPage from "../pages/manager_pages/MudangiManagementAddPage";
import MudangiManagementUpdatePage from "../pages/manager_pages/MudangiManagementUpdatePage";
import RoadManagementPage from "../pages/manager_pages/RoadManagementPage";
import RoadManagementAddPage from "../pages/manager_pages/RoadManagementAddPage";
import RoadManagementUpdatePage from "../pages/manager_pages/RoadManagementUpdatePage";
import RoadviewManagementPage from "../pages/manager_pages/RoadviewManagementPage";
import RoadviewManagementAddPage from "../pages/manager_pages/RoadviewManagementAddPage";
import RoadviewManagementUpdatePage from "../pages/manager_pages/RoadviewManagementUpdatePage";

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
          <Route path="/building/:building/:floor" element={<FloorPage />} />
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
      </div>
    </Router>
  );
}

export default App;
