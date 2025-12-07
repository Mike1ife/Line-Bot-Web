import { Profile } from "@/types/profile";
import { ThreeDot } from "react-loading-indicators";

import "./UserProfile.css"
import PointCard from "../PointCard/PointCard";

export default function UserProfile({ userProfile }: { userProfile: Profile | undefined }) {
    if (!userProfile) {
        return (
            <ThreeDot variant="bounce" color="#32cd32" size="medium" text="" textColor="" />
        )
    }
    console.log(userProfile)
    return (
        <div className="profile-container">
            <img className="user-icon" src={userProfile.picture_url} />
            <h2>{userProfile.name}</h2>
            <div className="point-card-container">
                <PointCard className="day-points" title="日排行" point={userProfile.day_points}></PointCard>
                <PointCard className="week-points" title="週排行" point={userProfile.week_points}></PointCard>
                <PointCard className="month-points" title="月排行" point={userProfile.month_points}></PointCard>
                <PointCard className="season-points" title="季排行" point={userProfile.season_points}></PointCard>
                <PointCard className="alltime-points" title="總排行" point={userProfile.all_time_points}></PointCard>
            </div>
        </div>
    )
}