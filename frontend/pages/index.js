import Head from 'next/head'
import Layout from "../components/layout";

export default function Home() {
  return (
      <Layout>
          <Head>
              <title>Home</title>
          </Head>
          <div>
              <p>Hello World</p>
          </div>
      </Layout>
  )
}
