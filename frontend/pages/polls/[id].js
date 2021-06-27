import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/client'
import Layout from "../../components/layout";
import { getAllPollsIds, getPollsData, vote } from "../../lib/polls";
import Date from "../../components/date";
import AccessDenied from "../accessdenied";

const maybePluralize = (count, noun, suffix = 's') =>
    `${count} ${noun}${count !== 1 ? suffix : ''}`;

export default function Poll({ pollData: { id, question_text, choices, owner, pub_date } }) {
    const [session, loading] = useSession()

    const router = useRouter()
    const voteForm = async event => {
        event.preventDefault()
        const choice_id = event.target.name.value
        await vote(choice_id)
        await router.push(`/results/${id}`)
    }
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
                    <Date dateString={pub_date} />
                </p>
                <form method='post' onSubmit={voteForm}>
                    {choices.map(({ id, choice_text }) => (
                        <div className="form-check" key={id}>
                            <input className="form-check-input" type="radio" name="name" id={id} value={id} required />
                            <label htmlFor={id} className="form-check-label">{choice_text}</label>
                        </div>
                    ))}
                    <br />
                    <input type="submit" value="vote" className="btn btn-success" disabled={session?false:true} /><br />
                    {!session ? <span><small>Login required</small></span> : ''}
                </form>
                <br />
                <Link href="/">
                    <a>← Back home</a>
                </Link> {' | '}
                <Link href={`/results/${id}`}>
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
    const paths = await getAllPollsIds('')
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const pollData = await getPollsData(params.id, '')
    return {
        props: {
            pollData
        }
    }
}
