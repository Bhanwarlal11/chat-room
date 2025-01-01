// import React from "react";
// import { useAuth } from "./context/authContext";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Login from "./pages/Login.js";
// import ChatRoom from "./pages/ChatRoom.js";
// import NotFound from "./pages/NotFound.js";


// const App = () => {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <PrivateRoute path="/rooms" element={<ChatRoom />} />
//         <PrivateRoute path="/rooms/:chatRoomId" element={<ChatRoom />} />
//         <Route path="*" element = {<NotFound/>}/>
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// const PrivateRoute = ({ element, ...rest }) => {
//   const { isAuthenticated } = useAuth(); // Get authentication state from the context

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? element : <Navigate to="/" />} // If authenticated, show element else redirect to login page
//     />
//   );
// };


import React from "react";
import { useAuth } from "./context/authContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.js";
import ChatRoom from "./pages/ChatRoom.js";
import NotFound from "./pages/NotFound.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Use the PrivateRoute component to handle authentication logic */}
        <Route path="/rooms" element={<PrivateRoute element={<ChatRoom />} />} />
        <Route path="/rooms/:chatRoomId" element={<PrivateRoute element={<ChatRoom />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Get authentication state from the context

  return isAuthenticated ? element : <Navigate to="/" />;
};
