import { BrowserRouter, Routes, Route } from "react-router-dom";
import Secondary from "./components/Secondary";
import Login from "./components/Login";
import Admin from "./components/Admin";
import ProtectedRoute from "./ProtectedRoute";
import Edit from './components/Edit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Secondary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/project-edit/:id" element={<Edit />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
