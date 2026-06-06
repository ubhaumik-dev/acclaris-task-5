import { BrowserRouter, Routes, Route } from "react-router-dom";

import Expenses from "./pages/Expenses";

import AddExpense from "./pages/AddExpense";
import Home from "./pages/Home"

const App = () => {
  

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addexpense' element={<AddExpense/>}/>
        <Route path='/expenses' element={<Expenses/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;
