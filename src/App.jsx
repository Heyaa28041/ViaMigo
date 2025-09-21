import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MacbookPro from "./components/screens/MacBookPro/MacBookPro";
import Login from "./components/screens/MacBookPro/sections/LoginModel/LoginModel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MacbookPro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
