import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../baseURL";

import './RightSidebar.css';

const RightSidebar = () => {
	const [trendingTweets, setTrendingTweets] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTrendingTweets = async () => {
			try {
				setLoading(true);
				const result = await axios.get(`${baseURL}/tweets/trending`);
				setTrendingTweets(result.data);
			} catch (error) {
				console.error("Error fetching trending tweets:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchTrendingTweets();
	}, []);

	const defaultTrends = [
		{ _id: 1, tagName: "gryffindor" },
		{ _id: 2, tagName: "hufflepuff" },
		{ _id: 3, tagName: "slytherin" },
		{ _id: 4, tagName: "ravenclaw" },
		{ _id: 5, tagName: "HarryPotter" }
	];

	const trendsToShow = trendingTweets || defaultTrends;

	const renderLoadingShimmer = () => (
		<>
			{[...Array(5)].map((_, index) => (
				<div key={index} className="loading-shimmer"></div>
			))}
		</>
	);

	return (
		<div className="right-sidebar">
			<div className="trending-container">
				<div className="trending-header">
					<div className="trending-icon">#</div>
					<h2 className="trending-title">Trending Now</h2>
				</div>
				
				{loading ? (
					renderLoadingShimmer()
				) : (
					<div className="trending-list">
						{trendsToShow.length > 0 ? (
							trendsToShow.map((TrendingTag, index) => (
								<>
								<div
									key={TrendingTag._id}
									className="trending-item"
									onClick={() => {
										// Handle click to navigate to trending topic
										console.log(`Clicked on #${TrendingTag.tagName}`);
									}}
								>
									<span className="trending-hash">#</span>
									<span className="trending-text">{TrendingTag.tagName}</span>
									<span className="trending-rank">{index + 1}</span>
								</div></>
							))
						) : (
							<div className="no-trends">
								<p>No trending topics right now</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default RightSidebar;