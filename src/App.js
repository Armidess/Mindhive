import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Explore from "./Pages/Explore/Explore";
import Signin from "./Pages/Signin/Signin";
import Navbar from "./components/Navbar/Navbar";
import Error from "./Pages/Error/Error";
import { useSelector } from "react-redux";

const Layout = () => {
	const { currentUser } = useSelector((state) => state.user);
	return (
		<div >
			{/* {currentUser && } */}
			<Navbar />  
			<Outlet></Outlet>
		</div>
	);  
};

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Error />,
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/profile/:id",
				element: <Profile />,
			},
			{
				path: "/explore",
				element: <Explore />,
			},
			{
				path: "/signin",
				element: <Signin />,
			},
			{
				path: "/signout",
				element: <Signin />,
			},
			{
				path: "/signup",
				element: <Signin/>,
			},
      {
        path : "test",
        element : <h2>Test</h2>
      }
		],
	},
]);

function App() {
	return (
		<div>
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
