import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import {getAllPollsIds, getPollsData, vote} from "../../lib/polls";
import Date from "../../components/date";


const maybePluralize = (count, noun, suffix = 's') =>
    `${count} ${noun}${count !== 1 ? suffix : ''}`;

export default function Results({pollData: {id, question_text, choices, owner, pub_date}}) {
    if (question_text === null) {
        return (
            <Layout>
                <div>Error fetching data!</div>
            </Layout>
        )
    }
    return (
        <Layout>
            <Head>
                <title>{question_text}</title>
            </Head>
            <div className="p-lg-5">
                <h2>{question_text}</h2>
                <p className="date">
                    By <Link href={`/u/${owner}`}><a>{owner}</a></Link> on{' '}
                    <Date dateString={pub_date}/>
                </p>
                <div>
                    {choices.map(({id, choice_text, votes}) => (
                        <div key={id}>{choice_text} -- {maybePluralize(votes, 'vote')}</div>
                    ))}
                    <br/>
                </div>
                <br/>
                <Link href="/">
                    <a>← Back home</a>
                </Link> {' | '}
                <Link href={`/polls/${id}/`}>
                    <a>Vote again</a>
                </Link>
            </div>
            <style jsx>{`
              .date {
                font-size: small;
              }
            `}</style>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllPollsIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const pollData = await getPollsData(params.id)
    return {
        props: {
            pollData
        }
    }
}
