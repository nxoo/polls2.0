import Layout from "../../components/layout";
import {getAllPollsIds, getPollsData} from "../../lib/polls";
import Date from "../../components/date";
import Link from "next/link";

export default function Poll({pollData}) {
    return (
        <Layout>
            <div className="p-2">
                <h4>{pollData.question_text}</h4>
                <span className="date">By {pollData.owner} on <Date dateString={pollData.pub_date} /></span>
                <ol type='a'>
                    {pollData.choices.map(({id, choice_text, votes}) => (
                        <li key={id}>{choice_text} -- {votes}</li>
                    ))}
                </ol>
                <Link href="/">
                    <a>← Back home</a>
                </Link>
            </div>
            <style jsx>{`
                .date {
                    font-size: x-small;
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
