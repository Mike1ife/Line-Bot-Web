import { Profile } from "@/types/interface";
import { ThreeDot } from "react-loading-indicators";

import "./UserProfile.css"

export default function UserProfile({ userProfile }: { userProfile: Profile | undefined }) {
    if (!userProfile) {
        return (
            <div className="loading-container">
                <ThreeDot variant="bounce" color="#32cd32" size="medium" text="Loading Profile" textColor="" />
            </div>
        )
    }

    return (
        <div className="profile-container">
            <img className="user-icon" src={userProfile.pictureUrl} />
            <h2>{userProfile.userName}</h2>
            <div className="point-card-container">
                <PointCard className="day-points" title="日排行" point={userProfile.dayPoints}></PointCard>
                <PointCard className="week-points" title="週排行" point={userProfile.weekPoints}></PointCard>
                <PointCard className="month-points" title="月排行" point={userProfile.monthPoints}></PointCard>
                <PointCard className="season-points" title="季排行" point={userProfile.seasonPoints}></PointCard>
                <PointCard className="alltime-points" title="總排行" point={userProfile.allTimePoints}></PointCard>
            </div>
        </div>
    )
}

function PointCard({ className, title, point }: { className: string, title: string, point: number }) {
    return (
        <div className={`point-card ${className}`}>
            <div className="header">
                <h4>{title}</h4>
                <p>當前積分</p>
            </div>
            <div className="content">
                <h1>{point}</h1>
                <p>分</p>
            </div>
        </div>
    )
}