import Link from "next/link";


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container col-sm-6">
                <Link href="/">
                    <a className="navbar-brand">Polls2.0</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
            </div>
            <style jsx>{`
              @media (min-width: 992px) {
                .navbar-brand {
                  display: none;
                }
              }
            `}</style>
        </nav>
    )
}