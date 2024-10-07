import { Routes, Route } from "react-router-dom";
import Header from "../components/shared/Header";
import UserList from "../components/users/user-list/UserList";
import UserForm from "../components/users/user-form/UserForm";

function App() {
  return (
    <div className="App">
      <Header></Header>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="user" element={<UserForm />} />
      </Routes>
    </div>
  );
}

export default App;
