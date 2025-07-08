import React from "react";
import ExploreTweets from "../../components/ExploreTweets/ExploreTweets";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { useSelector } from "react-redux";
import Signin from "../Signin/Signin";
import "./Explore.css";

const Explore = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <div className="explore-container">
          <div className="explore-layout">
            <aside className="left-sidebar-section">
              <LeftSidebar />
            </aside>
            
            <main className="main-content-section">
              <div className="explore-header">
                <h1 className="explore-title">Explore</h1>
                <p className="explore-subtitle">Discover trending thoughts and ideas</p>
              </div>
              <div className="explore-content">
                <ExploreTweets />
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

export default Explore;