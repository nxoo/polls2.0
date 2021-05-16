import axios from "axios";

export async function getPolls() {
    const res = await axios.get(`${process.env.HOST}/api/questions/`)
    return res.data
}

export async function getAllPollsIds() {
    const polls = await axios.get(`${process.env.HOST}/api/questions/`)
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
    return {
        id,
        ...res.data
    }
}
