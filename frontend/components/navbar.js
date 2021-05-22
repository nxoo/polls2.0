import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/client';


export default function Navbar() {
    const [session] = useSession()

    const handleLogin = async event => {
        event.preventDefault()
        await signIn()
    }

    const handleLogout = async e => {
        e.preventDefault()
        await signOut()
    }

    return (
        <nav className="navbar navbar-expand navbar-light">
            <div className="container">
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
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
                    {session ?
                        (
                            <>
                                <li className="nav-item">
                                    <Link href="/profile">
                                        <a className="nav-link">{session.user.username}</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="#">
                                        <a className="nav-link" onClick={handleLogout}>Logout</a>
                                    </Link>
                                </li>
                            </>
                        ) :
                        (
                            <>
                                <li className="nav-item">
                                    <Link href="/signup">
                                        <a className="nav-link">Sign up</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="#">
                                        <a className="nav-link" onClick={handleLogin}>Login</a>
                                    </Link>
                                </li>
                            </>
                        )
                    }
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