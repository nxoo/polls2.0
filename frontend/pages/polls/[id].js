import Link from "next/link";
import Layout from "../../components/layout";
import {getAllPollsIds, getPollsData} from "../../lib/polls";
import Date from "../../components/date";


const maybePluralize = (count, noun, suffix = 's') =>
    `${count} ${noun}${count !== 1 ? suffix : ''}`;

export default function Poll({pollData}) {
    if (pollData === null) {
        return (
            <Layout>
                <div>Error fetching data!</div>
            </Layout>
        )

    }
    return (
        <Layout>
            <div className="p-lg-2">
                <h2>{pollData.question_text}</h2>
                <p className="date">
                    By <Link href={`/u/${pollData.owner}`}><a>{pollData.owner}</a></Link> on{' '}
                    <Date dateString={pollData.pub_date}/>
                </p>
                <form method='post'>
                    {pollData.choices.map(({id, choice_text}) => (
                        <div className="form-check" key={id}>
                            <input type="radio" name="vote" id={id} className="form-check-input" required />
                            <label htmlFor={id} className="form-check-label">{choice_text}</label>
                        </div>
                    ))}
                    <br/>
                    <input type="submit" value="vote" className="btn btn-success"/>
                </form>
                <br />
                <Link href="/">
                    <a>← Back home</a>
                </Link> {' | '}
                <Link href={`/${pollData.id}/results`}>
                    <a>Results</a>
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
