"use client"

import { useEffect, useState } from "react";
import { Profile } from "@/types/profile"
import "./MainContent.css"
import UserProfile from "../UserProfile/UserProfile";
import Analytics from "../Analytics/Analytics";

export default function MainContent({ userName }: { userName: string }) {
    const [profile, setProfile] = useState<Profile | undefined>()

    const loadProfile = async () => {
        try {
            const response = await fetch(
                `https://biilybot.vercel.app/api/users/${userName}`
            );
            const data = await response.json();
            setProfile(data);
        } catch (err) {
            console.error("Fail to load profile:", err);
        }
    }

    useEffect(() => { loadProfile() }, [])

    return (
        <div className="main-container">
            <div>
                <UserProfile userProfile={profile}></UserProfile>
            </div>
            <div>
                <Analytics userName={userName}></Analytics>
            </div>
        </div>
    )
}