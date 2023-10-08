import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Page/Homepage/HomePage";
import Shop from "./Page/Shop/Shop";
import Detail from "./Page/Detail/Detail";
import Cart from "./Page/Carts/Cart";
import Register from "./Page/Register/Register";
import Login from "./Page/Login/Login";
import Pay from "./Page/Pay/Pay";
import PageAdmin from "./Admin/PageHome/PageAdmin";
import Bill from "./Page/Pay/Bill";
import CheckOut from "./Page/Pay/CheckOut";
import EditProduct from "./Admin/PageHome/EditProduct";
import History from "./Page/History/History";
import UserAdmin from "./Admin/UserAdmin";
import ProductAdmin from "./Admin/ProductAdmin";
import Historypage from "./Admin/Historypage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail/:product_id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="checkout/" element={<CheckOut />}>
          <Route path="step-1" element={<Pay />} />
          <Route path="step-2" element={<Bill />} />
        </Route>
        <Route path="/history" element={<History />} />
      </Routes>
      <Routes>
        <Route path="/admin">
          <Route index element={<PageAdmin />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
        {/* <Route path="/user-admin" element={<UserAdmin />} />
        <Route path="/product-admin" element={<ProductAdmin />} />
        <Route path="/history-admin" element={<Historypage />} /> */}
      </Routes>
    </>
  );
}

export default App;
