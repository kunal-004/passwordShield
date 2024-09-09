import "./App.css";
import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbarr";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Manager />
      </div>
      <Footer />
    </>
  );
}

export default App;
