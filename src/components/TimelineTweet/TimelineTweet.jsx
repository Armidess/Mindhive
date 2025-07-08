import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";
import baseURL from "../../baseURL";
import './TimelineTweet.css';

const TimelineTweet = () => {
	const [timeLine, setTimeLine] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);
				const timelineTweets = await axios.get(
					`${baseURL}/tweets/timeline/${currentUser._id}`
				);
				
				// Sort tweets by creation date (newest first)
				const sortedTweets = timelineTweets.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt);
				});
				
				setTimeLine(sortedTweets);
			} catch (err) {
				console.error("Error fetching timeline:", err);
				setError("Failed to load timeline. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		if (currentUser?._id) {
			fetchData();
		}
	}, [currentUser._id]);

	const handleRetry = () => {
		if (currentUser?._id) {
			const fetchData = async () => {
				try {
					setLoading(true);
					setError(null);
					const timelineTweets = await axios.get(
						`${baseURL}/tweets/timeline/${currentUser._id}`
					);
					
					const sortedTweets = timelineTweets.data.sort((a, b) => {
						return new Date(b.createdAt) - new Date(a.createdAt);
					});
					
					setTimeLine(sortedTweets);
				} catch (err) {
					console.error("Error fetching timeline:", err);
					setError("Failed to load timeline. Please try again.");
				} finally {
					setLoading(false);
				}
			};
			fetchData();
		}
	};

	const renderLoadingState = () => (
		<div className="loading-container">
			{[...Array(3)].map((_, index) => (
				<div key={index} className="loading-tweet">
					<div className="loading-header">
						<div className="loading-avatar"></div>
						<div className="loading-user-info">
							<div className="loading-username"></div>
							<div className="loading-handle"></div>
						</div>
					</div>
					<div className="loading-content">
						<div className="loading-text"></div>
						<div className="loading-text"></div>
						<div className="loading-text"></div>
					</div>
				</div>
			))}
		</div>
	);

	const renderErrorState = () => (
		<div className="error-container">
			<div className="error-icon">⚠️</div>
			<h3 className="error-title">Oops! Something went wrong</h3>
			<p className="error-message">{error}</p>
			<button className="retry-button" onClick={handleRetry}>
				Try Again
			</button>
		</div>
	);

	const renderEmptyState = () => (
		<div className="empty-timeline">
			<div className="empty-timeline-icon">🌱</div>
			<h3 className="empty-timeline-title">Your timeline is empty</h3>
			<p className="empty-timeline-subtitle">
				Start following people to see their tweets here
			</p>
			<button 
				className="empty-timeline-suggestion"
				onClick={() => {
					// Navigate to explore page or people suggestions
					console.log("Navigate to explore");
				}}
			>
				Discover People
			</button>
		</div>
	);

	if (loading) {
		return (
			<div className="timeline-container">
				{renderLoadingState()}
			</div>
		);
	}

	if (error) {
		return (
			<div className="timeline-container">
				{renderErrorState()}
			</div>
		);
	}

	if (!timeLine || timeLine.length === 0) {
		return (
			<div className="timeline-container">
				{renderEmptyState()}
			</div>
		);
	}

	return (
		<div className="timeline-container">
			<div className="timeline-wrapper">
				{timeLine.map((tweet) => (
					<div key={tweet._id} className="tweet-container">
						<Tweet tweet={tweet} setData={setTimeLine} />
					</div>
				))}
			</div>
		</div>
	);
};

export default TimelineTweet;