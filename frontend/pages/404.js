import Link from "next/link";
import Layout from "../components/layout";


export default function Custom404() {
    return (
        <Layout>
            <div className="custom404">
                <h4>404 - Page Not Found</h4>
                <Link href="/">
                    <a>← Back home</a>
                </Link>
            </div>
            <style jsx>{`
                .custom404 {
                    text-align: center;
                    margin-top: 20%;
                }
            `}</style>
        </Layout>
    )
}