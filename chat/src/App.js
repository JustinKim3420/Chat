import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Login />
      </div>
    </div>
  );
}

export default App;
