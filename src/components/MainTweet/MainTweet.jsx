import React, { useState } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";
import { useSelector } from "react-redux";
import axios from "axios";
import baseURL from "../../baseURL";
import "./MainTweet.css";

const MainTweet = () => {
	const [tweetText, setTweetText] = useState("");

	const { currentUser } = useSelector((state) => state.user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let tags = [];
			for (let i = 0; i < tweetText.length; i++) {
				if (tweetText[i] === "#") {
					i++;
					let tag = "";
					while (i < tweetText.length && tweetText[i] !== " ") {
						tag += tweetText[i];
						i++;
					}
					tags.push(tag);
				}
			}

			await axios.post(`${baseURL}/tweets`, {
				userId: currentUser._id,
				description: tweetText,
				tags: tags,
			});

			window.location.reload(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="main-tweet-container">
			{currentUser && (
				<div className="user-info">
					<p className="username">{currentUser.username}</p>
				</div>
			)}

			<form className="tweet-form">
				<div className="tweet-compose">
					<textarea
						onChange={(e) => setTweetText(e.target.value)}
						type="text"
						placeholder="What's happening?"
						maxLength={280}
						className="tweet-textarea"
						value={tweetText}
					></textarea>
					<div className="tweet-actions">
						<span className="character-count">
							{280 - tweetText.length} characters remaining
						</span>
						<button
							onClick={handleSubmit}
							className="tweet-button"
							disabled={!tweetText.trim()}
						>
							Share Thought
						</button>
					</div>
				</div>
			</form>
			<TimelineTweet />
		</div>
	);
};

export default MainTweet;