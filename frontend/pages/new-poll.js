import React, {useState} from "react";
import Head from "next/head";
import {useSession} from 'next-auth/client';
import {useRouter} from "next/router";
import Layout from "../components/layout";
import {newPoll} from "../lib/polls";


export default function NewPoll() {
    const [question, setQuestion] = useState('')
    const [choice1, setChoice1] = useState('')
    const [choice2, setChoice2] = useState('')
    const [session] = useSession()
    const router = useRouter()

    const handleSubmit = async event => {
        event.preventDefault()
        const data = {
            "question_text": question,
            "choices": [{'choice_text': choice1}, {'choice_text': choice2}]
        }
        const owner = session.accessToken
        const poll = await newPoll(data, owner)
        setQuestion('')
        setChoice1('')
        setChoice2('')
        await router.push(`polls/${poll.id}`)
    }

    return (
        <Layout>
            <Head>
                <title>New Poll</title>
            </Head>
            <div className="p-lg-5">
                <h2>Create a new poll</h2>
                <form className="col-sm-7" onSubmit={e => handleSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="question" className="form-label">Question</label>
                        <input
                            type="text"
                            className="form-control"
                            name="question"
                            id="question"
                            placeholder="Question"
                            value={question}
                            onChange={e => setQuestion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-text">Add choices to your question</div>
                    <div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="choice1"
                                className="form-control"
                                id="choice1"
                                placeholder="Choice 1"
                                value={choice1}
                                onChange={e =>setChoice1(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="choice2"
                                className="form-control"
                                id="choice2"
                                placeholder="Choice 2"
                                value={choice2}
                                onChange={e => setChoice2(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    )
}


