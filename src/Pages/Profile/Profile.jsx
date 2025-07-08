import React, { useState, useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import EditProfile from "../../components/EditProfile/EditProfile";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tweet from "../../components/Tweet/Tweet";
import { following } from "../../redux/userSlice";
import baseURL from "../../baseURL";
import "./Profile.css";

const Profile = () => {
	const [open, setOpen] = useState(false);
	const { currentUser } = useSelector((state) => state.user);
	const [userTweets, setUserTweets] = useState(null);
	const [userProfile, setUserProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const userTweets = await axios.get(`${baseURL}/tweets/user/all/${id}`);
				const userProfile = await axios.get(`${baseURL}/users/find/${id}`);
				userTweets.data.sort((a, b) => {
					return new Date(b.createdAt) - new Date(a.createdAt); // Descending order
				});
				setUserTweets(userTweets.data);
				setUserProfile(userProfile.data);
			} catch (err) {
				console.log("error", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [currentUser, id]);

	const handleFollow = async () => {
		if (!currentUser.following.includes(id)) {
			try {
				await axios.put(`${baseURL}/users/follow/${id}`, {
					id: currentUser._id,
				});
				dispatch(following(id));
			} catch (err) {
				console.log("error", err);
			}
		} else {
			try {
				await axios.put(`${baseURL}/users/unfollow/${id}`, {
					id: currentUser._id,
				});
				dispatch(following(id));
			} catch (err) {
				console.log("error", err);
			}
		}
	};

	const isOwnProfile = currentUser._id === id;
	const isFollowing = currentUser.following.includes(id);

	return (
		<>
			<div className="profile-container">
				<div className="profile-layout">
					<aside className="left-sidebar-section">
						<LeftSidebar />
					</aside>
					
					<main className="main-content-section">
						<div className="profile-header">
							<h1 className="profile-title">Profile</h1>
							<p className="profile-subtitle">
								{isOwnProfile ? "Your thoughts and connections" : "Explore their hive"}
							</p>
						</div>

						{loading ? (
							<div className="loading-container">
								<div className="loading-spinner"></div>
								<p className="loading-text">Loading profile...</p>
							</div>
						) : (
							<div className="profile-content">
								<div className="profile-info-card">
									<div className="profile-avatar-section">
										<img
											src={userProfile?.profilePicture || "/default-avatar.png"}
											alt="Profile Picture"
											className="profile-avatar"
										/>
									</div>
									
									<div className="profile-details">
										<h2 className="profile-username">{userProfile?.username}</h2>
										<p className="profile-email">{userProfile?.email}</p>
										
										<div className="profile-stats">
											<div className="stat-item">
												<span className="stat-number">{userTweets?.length || 0}</span>
												<span className="stat-label">Thoughts</span>
											</div>
											<div className="stat-item">
												<span className="stat-number">{userProfile?.following?.length || 0}</span>
												<span className="stat-label">Following</span>
											</div>
											<div className="stat-item">
												<span className="stat-number">{userProfile?.followers?.length || 0}</span>
												<span className="stat-label">Followers</span>
											</div>
										</div>
									</div>
									
									<div className="profile-actions">
										{isOwnProfile ? (
											<button
												className="profile-button edit-button"
												onClick={() => setOpen(true)}
											>
												Edit Profile
											</button>
										) : (
											<button
												className={`profile-button ${isFollowing ? 'following-button' : 'follow-button'}`}
												onClick={handleFollow}
											>
												{isFollowing ? 'Following' : 'Follow'}
											</button>
										)}
									</div>
								</div>

								<div className="tweets-section">
									<h3 className="tweets-title">
										{isOwnProfile ? "Your Thoughts" : `${userProfile?.username}'s Thoughts`}
									</h3>
									
									{userTweets && userTweets.length > 0 ? (
										<div className="tweets-container">
											{userTweets.map((tweet) => (
												<div className="tweet-item" key={tweet._id}>
													<Tweet tweet={tweet} setData={setUserTweets} />
												</div>
											))}
										</div>
									) : (
										<div className="no-tweets">
											<p className="no-tweets-text">
												{isOwnProfile 
													? "You haven't shared any thoughts yet. Start sharing with the hive!" 
													: "No thoughts shared yet."}
											</p>
										</div>
									)}
								</div>
							</div>
						)}
					</main>
					
					<aside className="right-sidebar-section">
						<RightSidebar />
					</aside>
				</div>
			</div>
			{open && <EditProfile setOpen={setOpen} />}
		</>
	);
};

export default Profile;