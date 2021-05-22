import Head from "next/head";
import Navbar from "./navbar";


export default function Layout({children}) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Polls2.0</title>
            </Head>
            <Navbar/>
            <div className="container col-sm-8">
                {children}
            </div>
        </>
    )
}
