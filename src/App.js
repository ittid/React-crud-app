// routing
import { Routes, Route } from "react-router-dom";
// styles
import "./App.css";
// components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { Category } from "./pages/Category";
import { Add } from "./pages/Add";
import { View } from "./pages/SingleView";
import { Edit } from "./pages/Edit";
import { EditeCat } from "./pages/EditeCat";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-2 sidebar bg-light">
            <Sidebar />
          </div>
          <div className="col-10 content">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="home" element={<Home />}></Route>
              <Route path="products">
                <Route index element={<Products />}></Route>
                <Route path="add" element={<Add />}></Route>
                <Route path=":productId" element={<View />}></Route>
                <Route path="edit/:editId" element={<Edit />}></Route>
              </Route>

              <Route path="category">
                <Route index element={<Category />}></Route>
                <Route path=":categorEditId" element={<EditeCat />}></Route>
              </Route>

              <Route path="about" element={<About />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
