import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogoScreen from "./Components/LogoScreen";
import RoleSelection from "./Components/RoleSelection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogoScreen />} />
        <Route path="/roles" element={<RoleSelection />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;