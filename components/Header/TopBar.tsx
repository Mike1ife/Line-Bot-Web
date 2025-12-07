import "./TopBar.css"
import Link from 'next/link';
import MenuItem from "../home/MenuItem/MenuItem"

export default function TopBar() {
    return (
        <div className='top-bar'>
            <span className="menu-item">
                <Link className="logo" href="/"></Link>
                <h1 className="title-text">Billy</h1>
            </span>
            <MenuItem icon="icon1" text="Games" href="/games" />
            <MenuItem icon="icon2" text="Teams" href="/teams" />
            <MenuItem icon="icon3" text="Users" href="/users" />
        </div>
    )
}