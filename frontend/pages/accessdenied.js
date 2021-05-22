import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";


export default function AccessDenied() {
    return (
        <Layout>
            <Head>
                <title>Access Denied</title>
            </Head>
            <div className="p-lg-5">
                <h3>Access Denied</h3>
                <Link href="/">
                    <a>← Back home</a>
                </Link>
            </div>
        </Layout>
    )
}