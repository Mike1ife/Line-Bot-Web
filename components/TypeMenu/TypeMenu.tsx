import { useState } from "react";
import './TypeMenu.css';

export default function TypeMenu({ loadPointLeaderBoard }: { loadPointLeaderBoard: Function }) {
    // Use state to keep track of active type
    const [activeType, setActiveType] = useState("week");

    const typeInfo = [
        { id: "day", label: "日排行" },
        { id: "week", label: "週排行" },
        { id: "month", label: "月排行" },
        { id: "season", label: "季排行" },
        { id: "all_time", label: "總排行" },
    ];

    const handleClick = (typeId: string) => {
        setActiveType(typeId);
        loadPointLeaderBoard(typeId);
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