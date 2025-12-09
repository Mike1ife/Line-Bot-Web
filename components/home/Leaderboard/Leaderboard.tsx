import { UserTypePoint } from "@/types/interface"
import "./Leaderboard.css"
import { ThreeDot } from "react-loading-indicators"
import { useEffect, useState } from "react"

export default function Leaderboard() {
    const [pointRank, setPointRank] = useState<UserTypePoint[]>([]);

    useEffect(() => {
        loadPointRank("week");
    }, [])

    const loadPointRank = async (rankType: string) => {
        try {
            const response = await fetch(
                `https://biilybot.vercel.app/api/home/leaderboard/${rankType}_points`
            );
            const data = await response.json();
            setPointRank(data);
        } catch (err) {
            console.error("Fail to load leaderboard:", err);
        }
    };

    return (
        <>
            <Podium pointRank={pointRank} />
            <TypeMenu loadPointRank={loadPointRank} />
            <PointRank pointRank={pointRank} />
        </>
    )
}

function Podium({ pointRank }: { pointRank: UserTypePoint[] }) {
    if (pointRank.length < 3) {
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
                    src={pointRank[1].pictureUrl}
                    alt="2nd place"
                />
                <img
                    className="first-user-icon"
                    id="first-user-icon"
                    src={pointRank[0].pictureUrl}
                    alt="1st place"
                />
                <img
                    className="third-user-icon"
                    id="third-user-icon"
                    src={pointRank[2].pictureUrl}
                    alt="3rd place"
                />
            </div>
            <img src="/podium.png" style={{ width: "450px", marginTop: "120px" }} />
        </div>
    );
}

function TypeMenu({ loadPointRank }: { loadPointRank: Function }) {
    // Use state to keep track of active type
    const [activeType, setActiveType] = useState<string>("week");

    const typeInfo = [
        { id: "day", label: "日排行" },
        { id: "week", label: "週排行" },
        { id: "month", label: "月排行" },
        { id: "season", label: "季排行" },
        { id: "all_time", label: "總排行" },
    ];

    const handleClick = (typeId: string) => {
        setActiveType(typeId);
        loadPointRank(typeId);
    }

    return (
        <>
            <div className='type-point-button'>
                {typeInfo.map((type, index) => {
                    return (
                        <div className={type.id === activeType ? "active" : ""} id={type.id} key={index} onClick={() => handleClick(type.id)}>
                            {type.label}
                        </div>
                    );
                })}
            </div >
        </>
    );
}

function PointRank({ pointRank }: { pointRank: UserTypePoint[] }) {
    return (
        <div className="point-rank-container">
            <div id="point-rank" className="point-rank">
                {pointRank.map((user, index) => (
                    <div key={index} className="user-container">
                        <img src={user.pictureUrl} alt={user.userName} />
                        <div className="user-name">{user.userName}</div>
                        <div className="user-point">{user.point} 分</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
