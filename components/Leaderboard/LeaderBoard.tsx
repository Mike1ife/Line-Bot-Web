import { UserTypePoint } from "@/types/leaderboard";
import "./LeaderBoard.css";

export default function LeaderBoard({ leaderboard }: { leaderboard: UserTypePoint[] }) {
    return (
        <div className="leaderboard-container">
            <div id="leaderboard" className="leaderboard">
                {leaderboard.map((user, index) => (
                    <div key={index} className="user-container">
                        <img src={user.picture_url} alt={user.name} />
                        <div className="user-name">{user.name}</div>
                        <div className="user-point">{user.point} 分</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
