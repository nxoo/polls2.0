import Head from 'next/head'
import Link from "next/link";
import {getPolls} from "../lib/polls";
import Layout from "../components/layout";
import Date from "../components/date";

export async function getStaticProps() {
    const polls = await getPolls()
    return {
        props: {
            polls,
        }
    }
}

export default function Home({polls}) {
    const layout = (error) => {
        return (
            <Layout>
                <div>{error}</div>
            </Layout>
        )
    }
    if (polls === null) {
        return layout("Error Fetching data! Try again later.")
    } else if (polls.length === 0) {
        return layout("No Polls Available")
    }
    return (
        <Layout>
            <Head>
                <title>Polls2.0</title>
            </Head>
            <div className="p-lg-5">
                {polls.map(({id, question_text, pub_date, owner}) => (
                    <div className="poll" key={id}>
                        <span className="date">
                            On <Date dateString={pub_date}/> by <a href="#">{owner}</a> 
                        </span>
                        <h2>
                            <Link href={`/polls/${id}/`}><a>{question_text}</a></Link>
                        </h2>
                    </div>
                ))}
            </div>
            <style jsx>{`
              .date {
                font-size: x-small;
              }

              .polls {
                text-align: center;
              }

              a {
                text-decoration: none;
                color: #0596ff;
              }

              .poll {
                margin-bottom: 10px;
              }
            `}</style>
        </Layout>
    )
}

