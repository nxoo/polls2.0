import Link from "next/link";


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-light">
            <div className="container">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link href="/">
                            <a className="nav-link active" aria-current="page">
                                <i className="bi bi-house-door-fill"></i>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/new-poll">
                            <a className="nav-link">
                                <i className="bi bi-plus"></i> Poll
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/login">
                            <a className="nav-link">
                                Login
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
            <style jsx>{`
              .nav-item {
                font-weight: bold;
              }
            `}</style>
        </nav>
    )
}