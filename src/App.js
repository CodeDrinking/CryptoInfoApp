
import Home from "./components/Home";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import Header from "./components/Header";
import CoinDetails from "./components/CoinDetails"
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {

  return (
    <BrowserRouter>
      <Header/> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coins" element={<Coins/>}/>
        <Route path="/exchanges" element={<Exchanges/>}/>
        <Route path="/coins/:id" element={<CoinDetails/>}/>

        </Routes>
   </BrowserRouter>

  );
}

export default App;
