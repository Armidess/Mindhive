import React from "react";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

import './LeftSidebar.css';

const LeftSidebar = () => {
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div className="left-sidebar">
			<div className="sidebar-nav">
				<Link to="/" className="nav-link">
					<div className="nav-item">
						<HomeIcon className="nav-icon" />
						<span className="nav-text">Home</span>
					</div>
				</Link>
				<Link to="/explore" className="nav-link">
					<div className="nav-item">
						<TagIcon className="nav-icon" />
						<span className="nav-text">Explore</span>
					</div>
				</Link>
				<Link to={`/profile/${currentUser._id}`} className="nav-link">
					<div className="nav-item">
						<PersonIcon className="nav-icon" />
						<span className="nav-text">Profile</span>
					</div>
				</Link>
			</div>
			<div className="user-section">
				<div className="user-info">
					<p className="user-name">{currentUser.username}</p>
					<p className="user-handle">@{currentUser.username}</p>
				</div>
				<div className="logout-section">
					<Link to="/signin" className="logout-link">
						<button
							className="logout-btn"
							onClick={handleLogout}
						>
							Logout
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LeftSidebar;