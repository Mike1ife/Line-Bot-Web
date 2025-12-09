import { UserInfo } from "@/types/interface"
import "./UsersContent.css"
import Link from "next/link";

export default async function UsersContent() {
    const response = await fetch("https://biilybot.vercel.app/api/users");
    const userList: UserInfo[] = await response.json()
    return (
        <div className="users-content-container">
            {userList.map((userInfo, index) => (<UserCard key={index} userInfo={userInfo} />))}
        </div>
    )
}

function UserCard({ userInfo }: { userInfo: UserInfo }) {
    return (
        <Link className="user-card-container" href={`/users/${userInfo.userName}`}>
            <div className="user-info-container">
                <img src={userInfo.pictureUrl} className="user-card-picture"></img>
                <h2>{userInfo.userName}</h2>
            </div>

            <div className="user-goat-count-container">
                <div className="week-goat-count">
                    <span>週最佳: {userInfo.weekGoatCount}</span>
                </div>
                <div className="month-goat-count">
                    <span>月最佳: {userInfo.monthGoatCount}</span>
                </div>
            </div>
        </Link>
    )
}
