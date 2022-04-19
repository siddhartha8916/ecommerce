import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home/Home";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import ProductDetails from "./components/product/ProductDetails";
import Products from "./components/product/Products";

function App() {
  return (
      <Router>
        <Header />
        <Switch>
          <main>
            <Route path="/" exact component={Home} />
            <Route path="/product/:id" exact component={ProductDetails} />
            <Route path="/products" exact component={Products} />
          </main>
        </Switch>
        <Footer />
      </Router>
  );
}

export default App;
