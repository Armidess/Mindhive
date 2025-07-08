import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";
import baseURL from "../../baseURL";
import "./ExploreTweets.css";

const ExploreTweets = () => {
	const [explore, setExplore] = useState(null);
	const [loading, setLoading] = useState(false);
	// const { currentUser } = useSelector((state) => state.user);
	const [currentUser,setCurrentUser] = useState({
		"_id" : "65859c2dcf56bc591ca2fab7"
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const exploreTweets = await axios.get(`${baseURL}/tweets/explore`);
				exploreTweets.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt); // Descending order
				});
				setExplore(exploreTweets.data);
			} catch (err) {
				console.log("error", err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [currentUser._id]);

	if (loading) {
		return (
			<div className="explore-tweets-container loading">
				<div className="decorative-blob blob-1"></div>
				<div className="decorative-blob blob-2"></div>
				
				<div className="container">
					<div className="max-width-container">
						<div className="loading-content">
							<div className="loading-spinner">
								<div className="spinner-inner"></div>
							</div>
							<h2 className="loading-title">Loading Explore Feed</h2>
							<p className="loading-subtitle">Discovering the latest thoughts from the hive...</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="explore-tweets-container">
			{/* Decorative background elements matching the HIVE MIND aesthetic */}
			<div className="decorative-blob blob-large"></div>
			<div className="decorative-blob blob-medium"></div>
			<div className="decorative-blob blob-small"></div>
			
			<div className="container">
				<div className="max-width-container">
					{/* Header Section */}
					<div className="header-section">
						<div className="header-icon">
							<svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
							</svg>
						</div>
						<h1 className="header-title">
							Explore <span className="header-highlight">HIVE MIND</span>
						</h1>
						<p className="header-subtitle">
							Discover trending thoughts and conversations from the community
						</p>
					</div>

					{/* Tweets Container */}
					<div className="tweets-container">
						{explore && explore.length > 0 ? (
							explore.map((tweet, index) => (
								<div 
									key={tweet._id} 
									className="tweet-card"
									style={{
										animationDelay: `${index * 100}ms`
									}}
								>
									<Tweet tweet={tweet} setData={setExplore} />
								</div>
							))
						) : (
							<div className="empty-state">
								<div className="empty-icon">
									<svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
									</svg>
								</div>
								<h3 className="empty-title">No tweets to explore yet</h3>
								<p className="empty-subtitle">Check back later for fresh content from the hive!</p>
							</div>
						)}
					</div>

					{/* Bottom decorative element */}
					<div className="footer-section">
						<div className="footer-content">
							<div className="footer-dot"></div>
							<span className="footer-text">Connected to the HIVE MIND</span>
							<div className="footer-dot"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExploreTweets;