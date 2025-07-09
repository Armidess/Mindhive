import React, { useState, useRef } from "react";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserPlaceholder from "../UserPlaceholder/UserPlaceholder";
import baseURL from "../../baseURL";
import './Navbar.css';

const Navbar = () => {
	const [userData, setUserData] = useState(null);
	const location = useLocation().pathname;
	const navigate = useNavigate();

	const inputRef = useRef(null);

	const handleKeyDown = async (event) => {
		if (event.key === "Enter") {
			try {
				const userName = event.target.value;
				const uID = await axios.get(`${baseURL}/users/search/${userName}`);
				inputRef.current.value = "";
				navigate(`/profile/${uID.data}`);
			} catch (err) {
				alert("No User Found");
			}
		}
	};

	return (
		<div className="navbar">
			<div className="logo-section">
				<div className="logo">
					<span className="logo-text">MH</span>
				</div>
			</div>

			<div className="main-section">
				<div>
					<h2 className="page-title">
						{location.includes("profile") ? (
							<UserPlaceholder setUserData={setUserData} userData={userData} />
						) : location.includes("explore") ? (
							"Explore"
						) : (
							"Home"
						)}
					</h2>
				</div>
			</div>

			<div className="search-section">
				<div className="search-container">
					<SearchIcon className="search-icon" />
					<input
						type="text"
						className="search-input"
						placeholder="Search users..."
						ref={inputRef}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;