import { UserTypePoint } from "@/types/leaderboard";
import { ThreeDot } from "react-loading-indicators";
import "./Podium.css";


export default function Podium({ leaderboard }: { leaderboard: UserTypePoint[] }) {
    if (leaderboard.length < 3) {
        return (
            <div className="podium-container">
                <ThreeDot variant="bounce" color="#32cd32" size="medium" text="" textColor="" />
            </div>
        )
    }

    return (
        <div className="podium-container">
            <div className="top3-container">
                <img
                    className="second-user-icon"
                    id="second-user-icon"
                    src={leaderboard[1].picture_url}
                    alt="2nd place"
                />
                <img
                    className="first-user-icon"
                    id="first-user-icon"
                    src={leaderboard[0].picture_url}
                    alt="1st place"
                />
                <img
                    className="third-user-icon"
                    id="third-user-icon"
                    src={leaderboard[2].picture_url}
                    alt="3rd place"
                />
            </div>
            <img src="/podium.png" style={{ width: "450px", marginTop: "120px" }} />
        </div>
    );
}
