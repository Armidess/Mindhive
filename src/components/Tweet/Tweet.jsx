import axios from "axios";
import React, { useState } from "react";
import formatDistance from "date-fns/formatDistance";

import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import baseURL from "../../baseURL";
import "./Tweet.css";

const Tweet = ({ tweet, setData }) => {
	const { currentUser } = useSelector((state) => state.user);
	const [userData, setUserData] = useState();
	const [isLiking, setIsLiking] = useState(false);

	const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
	const location = useLocation().pathname;
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const findUser = await axios.get(
					`${baseURL}/users/find/${tweet.userId}`
				);

				setUserData(findUser.data);
			} catch (err) {
				console.log("error", err);
			}
		};
		fetchData();
	}, [tweet.userId, tweet.likes]);

	const handleLike = async (e) => {
		e.preventDefault();

		if (isLiking) return;
		setIsLiking(true);

		try {
			await axios.put(`${baseURL}/tweets/${tweet._id}/like`, {
				id: currentUser._id,
			});

			if (location.includes("profile")) {
				const newData = await axios.get(`${baseURL}/tweets/user/all/${id}`);
				newData.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt); // Descending order
				});
				setData(newData.data);
			} else if (location.includes("explore")) {
				const newData = await axios.get(`${baseURL}/tweets/explore`);
				newData.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt); // Descending order
				});
				setData(newData.data);
			} else {
				const newData = await axios.get(
					`${baseURL}/tweets/timeline/${currentUser._id}`
				);
				newData.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt); // Descending order
				});
				setData(newData.data);
			}
		} catch (err) {
			console.log("error", err);
		} finally {
			setIsLiking(false);
		}
	};

	return (
		<div className="tweet-component">
			{userData && (
				<>
					{/* Header with user info and timestamp */}
					<div className="tweet-header">
						<div className="user-avatar">
							<div className="avatar-placeholder">
								{userData.username.charAt(0).toUpperCase()}
							</div>
						</div>
						
						<div className="user-info">
							<Link to={`/profile/${userData._id}`} className="username-link">
								<h3 className="display-name">{userData.username}</h3>
							</Link>
							<div className="user-meta">
								<span className="handle">@{userData.username}</span>
								<span className="separator">•</span>
								<span className="timestamp">{dateStr}</span>
							</div>
						</div>
					</div>

					{/* Tweet content */}
					<div className="tweet-content">
						<p className="tweet-text">{tweet.description}</p>
					</div>

					{/* Actions bar */}
					<div className="tweet-actions">
						<button 
							onClick={handleLike} 
							className={`like-button ${tweet.likes.includes(currentUser._id) ? 'liked' : ''} ${isLiking ? 'loading' : ''}`}
							disabled={isLiking}
						>
							<div className="like-icon-container">
								{tweet.likes.includes(currentUser._id) ? (
									<FavoriteIcon className="like-icon filled" />
								) : (
									<FavoriteBorderIcon className="like-icon" />
								)}
							</div>
							<span className="like-count">{tweet.likes.length}</span>
						</button>

						{/* Additional action buttons could go here */}
						<div className="action-spacer"></div>
						
						<div className="tweet-engagement">
							<span className="engagement-text">
								{tweet.likes.length === 1 ? '1 like' : `${tweet.likes.length} likes`}
							</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Tweet;