import axios from "axios";
import {error} from "next/dist/build/output/log";

export async function getPolls() {
    const res = await axios.get(`${process.env.HOST}/api/questions/`)
        .catch(error => console.log(error))
    return res.data
}

export async function getAllPollsIds() {
    const polls = await axios.get(`${process.env.HOST}/api/questions/`)
        .catch(error => console.log(error))
    return polls.data.map(poll => {
        return {
            params: {
                id: poll.id.toString()
            }
        }
    })
}

export async function getPollsData(id) {
    const res = await axios.get(`${process.env.HOST}/api/questions/${id}/`)
        .catch(error => console.log(error))
    return res.data
}
