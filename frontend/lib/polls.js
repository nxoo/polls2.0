import axios from "axios";
import { error } from "next/dist/build/output/log";

const HOST = process.env.NEXT_PUBLIC_HOST
const TOKEN = process.env.NEXT_PUBLIC_TOKEN

export async function getPolls() {
    try {
        const res = await axios.get(`${HOST}/api/questions/`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getAllPollsIds() {
    try {
        const polls = await axios.get(`${HOST}/api/questions/`)
        return polls.data.map(poll => {
            return {
                params: {
                    id: poll.id.toString()
                }
            }
        })
    } catch (error) {
        return []
    }
}

export async function getPollsData(id) {
    try {
        const res = await axios.get(`${HOST}/api/questions/${id}/`)
        return res.data
    } catch (error) {
        return null
    }
}


export async function vote(id) {
    try {
        await axios.get(`${HOST}/api/choices/${id}/vote/`)
    } catch (error) {
        return null
    }
}

export async function newPoll(data, token) {
    try {
        const res = await axios({
            method: "post",
            url: `${HOST}/api/questions/`,
            data: data,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        return null
    }
}


export async function getAPIToken(data) {
    try {
        const res = await axios({
            method: "post",
            url: `${HOST}/rest-auth/login/`,
            data: data,
        })
        return res.data
    } catch (error) {
        return null
    }
}

export async function getGoogleToken(data) {
    try {
        const res = await axios({
            method: "post",
            url: `${HOST}/rest-auth/google/`,
            data: data,
        })
        return res.data
    } catch (error) {
        return null
    }
}


export async function signUp(data) {
    try {
        const res = await axios({
            method: "post",
            url: `${HOST}/rest-auth/registration/`,
            data: data
        })
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}
