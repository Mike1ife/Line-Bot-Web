import "./PointCard.css"

export default function PointCard({ className, title, point }: { className: string, title: string, point: number }) {

    return (
        <div className={`point-card ${className}`}>
            <div className="header">
                <h4>{title}</h4>
                <p>當前積分</p>
            </div>
            <div className="content">
                <h1>{point}</h1>
                <p>分</p>
            </div>
        </div>
    )
}