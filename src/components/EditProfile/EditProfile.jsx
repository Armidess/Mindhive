import React, { useState, useEffect } from "react";
import "./EditProfile.css"

// Note: Remove these imports when implementing - they're just for demo
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { changeProfile, logout } from "../../redux/userSlice";
// import { useNavigate } from "react-router-dom";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import app from "../../firebase.js";
// import baseURL from "../../baseURL";

const EditProfile = ({ setOpen }) => {
	// Demo state - replace with your actual Redux state
	const currentUser = { _id: "demo-user-id" };

	const [img, setImg] = useState(null);
	const [imgUploadProgress, setImgUploadProgress] = useState(0);

	// Demo functions - replace with your actual Redux dispatch and navigation
	const dispatch = () => console.log("Redux dispatch");
	const navigate = () => console.log("Navigation");

	const uploadImg = (file) => {
		// Demo upload simulation
		console.log("Uploading file:", file.name);
		setImgUploadProgress(25);
		setTimeout(() => setImgUploadProgress(50), 500);
		setTimeout(() => setImgUploadProgress(75), 1000);
		setTimeout(() => {
			setImgUploadProgress(100);
			setTimeout(() => {
				setImgUploadProgress(0);
				setOpen(false);
			}, 500);
		}, 1500);
	};

	const handleDelete = async () => {
		// Demo delete - replace with your actual API call
		if (window.confirm("Are you sure you want to delete your account?")) {
			console.log("Account deleted");
			setOpen(false);
		}
	};

	useEffect(() => {
		img && uploadImg(img);
	}, [img]);

	return (
		<div className="modal-overlay">
			<div className="modal-container">
				<div className="modal-header">
					<h2 className="modal-title">Edit Profile</h2>
					<button
						onClick={() => setOpen(false)}
						className="close-button"
					>
						×
					</button>
				</div>

				<div className="modal-body">
					<div className="section">
						<div className="section-title">Profile Picture</div>
						{imgUploadProgress > 0 ? (
							<div className="progress-text">
								Uploading {imgUploadProgress}%
							</div>
						) : (
							<div className="file-input-container">
								<input
									type="file"
									className="file-input"
									accept="image/*"
									onChange={(e) => setImg(e.target.files[0])}
								/>
								<div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
									Choose a new profile picture
								</div>
							</div>
						)}
					</div>

					<div className="section danger-zone">
						<div className="danger-title">Danger Zone</div>
						<div className="danger-text">
							Once you delete your account, there is no going back. Please be certain.
						</div>
						<button
							className="delete-button"
							onClick={handleDelete}
						>
							Delete Account
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;