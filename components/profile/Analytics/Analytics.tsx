import { useEffect, useState } from "react";
import "./Analytics.css"
import { PointHistory, Counter } from "@/types/interface";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Analytics({ userName }: { userName: string }) {
    const [chartType, setChartType] = useState<string>("point");
    const [rankType, setRankType] = useState<string>("week_points");
    const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
    const [countType, setCountType] = useState<string>("correct");
    const [countRange, setCountRange] = useState<string>("season");
    const [counter, setCounter] = useState<Counter[]>([]);

    const loadPointHistory = async (rankType: string) => {
        try {
            const response = await fetch(
                `https://biilybot.vercel.app/api/users/${userName}/points/${rankType}`
            );
            const data = await response.json();
            setRankType(rankType);
            setPointHistory(data);
        } catch (err) {
            console.error("Fail to load analytics:", err);
        }
    }

    const loadCounter = async (countType: string, countRange: string) => {
        try {
            const response = await fetch(
                `https://biilybot.vercel.app/api/users/${userName}/count/${countType}/${countRange}`
            )
            const data = await response.json();
            setCountType(countType)
            setCountRange(countRange)
            setCounter(data);
        } catch (err) {
            console.error("Fail to load counter", err)
        }
    }

    useEffect(() => {
        loadPointHistory("week_points");
    }, [])

    const handleClick = async () => {
        if (chartType == "point") {
            setChartType("predict")
            await loadCounter("correct", "season");
        } else {
            setChartType("point")
            await loadPointHistory("week_points");
        }
    };


    return (
        <div className="analyatics-container">
            <div className="switch-container">
                <div className={`chart-switch ${chartType === "predict" ? "right" : ""}`} onClick={handleClick}>
                    <div className="chart-switch-oval" id="switch" />
                    <div className="chart-switch-label-container">
                        <span className="chart-switch-label">積分</span>
                        <span className="chart-switch-label">預測</span>
                    </div>
                </div>


                {chartType === "point" ? (
                    <PointHeader rankType={rankType} loadPointHistory={loadPointHistory} />
                ) : (
                    <PredictHeader countType={countType} countRange={countRange} loadCounter={loadCounter} />
                )
                }

            </div>

            <div className="chart-container">
                {chartType === "point" ? (
                    <PointChart pointHistory={pointHistory} rankType={rankType} />
                ) : (
                    <PredictChart counter={counter} countType={countType} />
                )}
            </div>
        </div >
    )
}

function PointHeader({ rankType, loadPointHistory }: { rankType: string, loadPointHistory: Function }) {
    return (
        <div className="rank-type-oval-container">
            <div className={`rank-type-oval${rankType === "day_points" ? " active" : ""}`} onClick={() => loadPointHistory("day_points")}>
                <span className="rank-type-label">日積分</span>
            </div>
            <div className={`rank-type-oval${rankType === "week_points" ? " active" : ""}`} onClick={() => loadPointHistory("week_points")}>
                <span className="rank-type-label">週積分</span>
            </div>
            <div className={`rank-type-oval${rankType === "month_points" ? " active" : ""}`} onClick={() => loadPointHistory("month_points")}>
                <span className="rank-type-label">月積分</span>
            </div>
            <div className={`rank-type-oval${rankType === "season_points" ? " active" : ""}`} onClick={() => loadPointHistory("season_points")}>
                <span className="rank-type-label">季積分</span>
            </div>
        </div>
    )
}

function PointChart({ pointHistory, rankType }: { pointHistory: PointHistory[], rankType: string }) {
    return (
        <ResponsiveContainer width="100%" height={600}>
            <LineChart data={pointHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="pointValue"
                    name={rankType}
                    stroke="cornflowerblue"
                    strokeWidth={2}
                    dot={{ fill: "cornflowerblue", r: 4 }}
                    activeDot={{ r: 6 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}

function PredictHeader({ countType, countRange, loadCounter }: { countType: string, countRange: string, loadCounter: Function }) {
    const handleCountTypeClick = () => {
        if (countType == "wrong") {
            loadCounter("correct", countRange)
        } else {
            loadCounter("wrong", countRange)
        }
    }

    const handleCountRangeClick = () => {
        if (countRange == "season") {
            loadCounter(countType, "all_time")
        } else {
            loadCounter(countType, "season")
        }
    }

    return (
        <div className="count-type-oval-container">
            <div className={`chart-switch ${countType == "wrong" ? "right" : ""}`} onClick={handleCountTypeClick}>
                <div className="chart-switch-oval" id="switch" />
                <div className="chart-switch-label-container">
                    <span className="chart-switch-label">信仰</span>
                    <span className="chart-switch-label">傻鳥</span>
                </div>
            </div>
            <div className={`chart-switch ${countRange == "all_time" ? "right" : ""}`} onClick={handleCountRangeClick}>
                <div className="chart-switch-oval" id="switch" />
                <div className="chart-switch-label-container">
                    <span className="chart-switch-label">賽季</span>
                    <span className="chart-switch-label">歷史</span>
                </div>
            </div>
        </div>
    )
}

function PredictChart({ counter, countType }: { counter: Counter[], countType: string }) {
    return (
        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
            <ResponsiveContainer width="100%" height={counter.length * 40}>
                <BarChart data={counter} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="teamLogoUrl" type="category" tick={<LogoTick />} />
                    <Tooltip content={<CustomTooltip countType={countType} />} />
                    <Bar dataKey="count" fill="rgba(100, 148, 237, 0.6)" barSize={15} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

function LogoTick(props: any) {
    const { x, y, payload } = props;
    const teamLogoUrl = payload.value;

    return (
        <image
            href={teamLogoUrl}
            x={-30}
            y={-15}
            width={30}
            height={30}
            transform={`translate(${x}, ${y})`} />
    );
}

function CustomTooltip({ active, payload, countType }: any) {
    if (!active || !payload?.length) return null;

    const { teamName, count } = payload[0].payload;

    return (
        <div
            style={{
                background: "#1e1e1e",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #444",
                color: "white",
            }}
        >
            <div style={{ marginBottom: 5, fontSize: 14, fontWeight: 600 }}>
                {teamName}
            </div>

            <div style={{ fontSize: 14 }}>
                {countType[0].toUpperCase() + countType.substr(1).toLowerCase()}: <span style={{ color: "#4da6ff", fontWeight: "bold" }}>{count}</span>
            </div>
        </div>
    );
}
