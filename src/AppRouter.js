import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./component/Error";
import Home from "./component/Home";
import School from "./component/class/School";
import Tenth from "./component/class/Tenth";
import Twelth from "./component/class/Twelth";
import Jee from "./component/class/Jee";
import Neet from "./component/class/Neet";
import College from "./component/college/College";
import First from "./component/college/First";
import Second from "./component/college/Second";
import Third from "./component/college/Third";
import Fourth from "./component/college/Fourth";
import Competitive from "./component/Competitive";
import Login from "./component/LoginPage/Login";
import Signup from "./component/LoginPage/SignUp";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "school",
        element: <School />,
        children: [
          { path: "tenth", element: <Tenth /> },
          { path: "twelth", element: <Twelth /> },
          { path: "jee", element: <Jee /> },
          { path: "neet", element: <Neet /> },
        ],
      },
      {
        path: "college",
        element: <College />,
        children: [
          { path: "first", element: <First /> },
          { path: "second", element: <Second /> },
          { path: "third", element: <Third /> },
          { path: "fourth", element: <Fourth /> },
        ],
      },
      { path: "competitive", element: <Competitive /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

export default AppRouter;
