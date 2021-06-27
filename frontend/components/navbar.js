import Link from "next/link";
import {useSession, signIn, signOut} from 'next-auth/client';


export default function Navbar() {
    const [session, loading] = useSession()

    console.log(session)
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
                                + Poll
                            </a>
                        </Link>
                    </li>
                    {session ?
                        (
                            <>
                                <li className="nav-item">
                                    <Link href={`/${session.user.username}`}>
                                        <a className="nav-link">{session.user.username}</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="#">
                                        <a className="nav-link" onClick={() => signOut()}>Logout</a>
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
                                        <a className="nav-link" onClick={() => signIn()}>Login</a>
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
