import axios from "axios";
import {error} from "next/dist/build/output/log";

export async function getPolls() {
    try {
        const res = await axios.get(`${process.env.HOST}/api/questions/`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getAllPollsIds() {
    try {
        const polls = await axios.get(`${process.env.HOST}/api/questions/`)
        return polls.data.map(poll => {
            return {
                params: {
                    id: poll.id.toString()
                }
            }
        })
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function getPollsData(id) {
    try {
        const res = await axios.get(`${process.env.HOST}/api/questions/${id}/`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
