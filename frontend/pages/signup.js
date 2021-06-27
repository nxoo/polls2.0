import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import {signIn} from 'next-auth/client'
import { signUp } from "../lib/polls";



class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password1: '',
            password2: '',
            error: ""
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async event => {
        event.preventDefault()
        const data = {
            "email": this.state.email,
            'password1': this.state.password1,
            'password2': this.state.password2
        }
        const res = await signUp(data)
        console.log(res.error)
        this.setState({ email: '', password1: '', password2: '', error:res.error })
    }

    render() {
        let { email, password1, password2, error } = this.state;
        return (
            <Layout>
                <Head>
                    <title>Sign up</title>
                </Head>
                <div className="p-lg-5">
                    <h2>Create a new account</h2>
                    <h3>{error}</h3>
                    <form className="col-sm-7" onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-text">Set a strong password</div>
                        <div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="password1"
                                    className="form-control"
                                    id="password1"
                                    placeholder="Password"
                                    value={password1}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="password2"
                                    className="form-control"
                                    id="password2"
                                    placeholder="Confirm Password"
                                    value={password2}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <br/>
                    <div>
                        <a href="#" onClick={() => signIn('google')}>Sign up with Google</a>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default SignUp;

