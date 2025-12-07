"use client";

import { useState, useEffect } from "react"
import { MatchToday } from "@/types/match";
import { UserTypePoint } from "@/types/leaderboard"

import "./MainContent.css"
import MatchList from "../MatchList/MatchList";
import Podium from "../Podium/Podium"
import TypeMenu from "../TypeMenu/TypeMenu"
import LeaderBoard from "../Leaderboard/LeaderBoard"

export default function MainContent() {
    const [matches, setMatches] = useState<MatchToday[]>([]);
    const [leaderboard, setLeaderboard] = useState<UserTypePoint[]>([]);

    const loadMatchToday = async () => {
        try {
            const response = await fetch(
                "https://biilybot.vercel.app/api/home/nba_today"
            );
            const data = await response.json();
            setMatches(data); // ✅ Store match data in state
        } catch (err) {
            console.error("Fail to load matches:", err);
        }
    };

    const loadPointLeaderBoard = async (rankType: string) => {
        try {
            const response = await fetch(
                `https://biilybot.vercel.app/api/home/leaderboard/user_${rankType}_point`
            );
            const data = await response.json();
            setLeaderboard(data);
        } catch (err) {
            console.error("Fail to load leaderboard:", err);
        }
    };

    useEffect(() => {
        loadPointLeaderBoard("week");
        loadMatchToday();
    }, [])

    return (
        <div className="main-container">
            <div className="body-container">
                <MatchList matches={matches} />
            </div>
            <div className="body-container">
                <Podium leaderboard={leaderboard} />
                <TypeMenu loadPointLeaderBoard={loadPointLeaderBoard} />
                <LeaderBoard leaderboard={leaderboard} />
            </div>
        </div>
    );
}