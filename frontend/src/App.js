import "./App.css";
import "./i18n";
import DrawerApp from "./components/DrawerApp";
import Login from "./screens/login.screen";
import { useStateContext } from "./context/ContextProvider";
import ResetPassword from "./screens/ResetPassword";
import DailyPopup from "./components/Reminder";

function App() {
  const { token, user } = useStateContext();

  const currentPath = window.location.pathname; // Get the current pathname

  // Check if the URL matches /reset-password
  if (currentPath === "/reset-password") {
    return <ResetPassword />; // Render ResetPassword component
  }

  if (!token) {
    return <Login />;
  }

  return (
    <div className="App">
      {(user?.user_role === "ADMIN" || user?.user_role === "STAFF") && (
        <DailyPopup />
      )}
      <DrawerApp />
    </div>
  );
}

export default App;
