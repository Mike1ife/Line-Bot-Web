import { MatchToday } from "@/types/match";
import "./MatchList.css";
import { Slab } from "react-loading-indicators";

export default function MatchList({ matches }: { matches: MatchToday[] }) {
    if (matches.length == 0) {
        return (
            <div className="match-container">
                <Slab color="#d165f7" size="medium" text="Loading Games" textColor="" />
            </div>
        )
    }

    return (
        <div className="match-container">
            {matches.map((match, index) => (
                <div key={index} className="match-box">
                    <div className="team-container">
                        <img src={match.team1_logo_url} alt="team1" />
                        <h3 className="team-standing-text">{match.team1_standing}</h3>
                    </div>

                    <div className="score-container">
                        {match.game_time ? (
                            <>
                                <h1 className="time-score-text">{match.game_time}</h1>
                                <h3 className="odd-text">
                                    {match.team1_point} / {match.team2_point}
                                </h3>
                            </>
                        ) : (
                            <>
                                <h1 className="time-score-text">
                                    {match.team1_score} - {match.team2_score}
                                </h1>
                                <h3 className="odd-text">
                                    {match.team1_point} / {match.team2_point}
                                </h3>
                            </>
                        )}
                    </div>

                    <div className="team-container">
                        <img src={match.team2_logo_url} alt="team2" />
                        <h3 className="team-standing-text">{match.team2_standing}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
