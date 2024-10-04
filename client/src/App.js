import './App.css';
import 'antd/dist/reset.css'; // Import CSS của Ant Design
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminHome from './components/AdminDashboard/AdminPage/AdminPage';

function App() {
  return (
    <Router>
      <main className="App">
        <Routes>
          {/* Đặt AdminPagetại route chính */}
          <Route path='/admin/*' element={<AdminHome />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
