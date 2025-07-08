import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import MainTweet from "../../components/MainTweet/MainTweet";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import Signin from "../Signin/Signin";
import { useSelector } from "react-redux";
import "./Home.css";

const Home = () => {
	const { currentUser } = useSelector((state) => state.user);

	return (
		<>
			{!currentUser ? (
				<Signin />
			) : (
				<div className="home-container">
					<div className="home-layout">
						<aside className="left-sidebar-section">
							<LeftSidebar />
						</aside>
						
						<main className="main-content-section">
							<div className="home-header">
								<h1 className="home-title">Home</h1>
								<p className="home-subtitle">Share your thoughts with the hive</p>
							</div>
							<div className="main-content">
								<MainTweet />
							</div>
						</main>
						
						<aside className="right-sidebar-section">
							<RightSidebar />
						</aside>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;