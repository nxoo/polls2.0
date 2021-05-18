import Link from "next/link";
import Layout from "../components/layout";


export default function Custom404() {
    return (
        <Layout>
            <div className="custom404 p-lg-2">
                <h2>404 - Page Not Found</h2>
                <Link href="/">
                    <a>← Back home</a>
                </Link>
            </div>
            <style jsx>{`
              .custom404 {
                  margin-top: 10px;
              }
            `}</style>
        </Layout>
    )
}