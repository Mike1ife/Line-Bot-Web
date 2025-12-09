import { MatchToday } from "@/types/interface";
import "./MatchList.css";
import { Slab } from "react-loading-indicators";

export default function MatchList({ matches }: { matches: MatchToday[] }) {
    if (matches.length == 0) {
        return (
            <div className="loading-container">
                <Slab color="#d165f7" size="medium" text="Loading Games" textColor="" />
            </div>
        )
    }

    return (
        <div className="match-container">
            {matches.map((match, index) => (
                <div key={index} className="match-box">
                    <div className="team-container">
                        <img src={match.team1LogoUrl} alt="team1" />
                        <h3 className="team-standing-text">{match.team1Standing}</h3>
                    </div>

                    <div className="score-container">
                        <h1 className="time-score-text">
                            {match.gameTime
                                ? match.gameTime
                                : `${match.team1Score} - ${match.team2Score}`}
                        </h1>

                        <h3 className="odd-text">
                            {match.team1Point} / {match.team2Point}
                        </h3>
                    </div>

                    <div className="team-container">
                        <img src={match.team2LogoUrl} alt="team2" />
                        <h3 className="team-standing-text">{match.team2Standing}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
