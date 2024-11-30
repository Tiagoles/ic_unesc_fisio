import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../routes/About/About";
import LoginUserSystem from "../routes/loginUserSystem/loginUserSystem";
import RegisterUserSystem from "../routes/RegisterUserSystem/registerUserSystem";
import Navbar from "../components/navbar/Navbar";

 
 

function App() {
  return (
    <div className="app">
    <div className="">
        <BrowserRouter>
          <Navbar />  
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="register/user/system" element={<RegisterUserSystem />} />
            <Route path="login/user/system" element={<LoginUserSystem />} />
          </Routes>
        </BrowserRouter>
     
      </div> 
    </div>
   
      
  );
}

export default App;
