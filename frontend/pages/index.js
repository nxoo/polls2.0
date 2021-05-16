import Head from 'next/head'
import Link from "next/link";
import Layout from "../components/layout";
import {getPolls} from "../lib/polls";

export async function getStaticProps() {
    const polls = await getPolls()
    return {
        props: {
            polls
        }
    }
}

export default function Home({polls}) {
    return (
        <Layout>
            <Head>
                <title>Polls2.0</title>
            </Head>
            <div className="p-2">
                {polls.map(({id, question_text, pub_date}) => (
                    <h4 key={id}>
                        <Link href={`/polls/${id}/`}><a>{question_text}</a></Link>
                    </h4>
                ))}
            </div>
            <style jsx>{`
              .polls {
                text-align: center;
              }
            `}</style>
        </Layout>
    )
}

