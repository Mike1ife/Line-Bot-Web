import './MenuItem.css'
import Link from 'next/link';

export default function MenuItem(props: { icon: string, text: string, href: string }) {
    return (
        <span className="menu-item">
            <div className={props.icon}></div>
            <Link className="menu-text" href={props.href}>{props.text}</Link>
        </span>
    )
}