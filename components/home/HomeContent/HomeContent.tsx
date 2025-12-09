"use client";

import { useState, useEffect } from "react"
import { MatchToday, UserTypePoint } from "@/types/interface";

import "./HomeContent.css"
import MatchList from "../MatchList/MatchList";
import LeaderBoard from "../Leaderboard/Leaderboard"

export default function MainContent() {
    const [matches, setMatches] = useState<MatchToday[]>([]);

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


    useEffect(() => {
        loadMatchToday();
    }, [])

    return (
        <div className="home-content-container">
            <div className="body-container">
                <MatchList matches={matches} />
            </div>
            <div className="body-container">
                <LeaderBoard />
            </div>
        </div>
    );
}