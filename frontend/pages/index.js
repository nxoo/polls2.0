import Head from 'next/head'
import Layout from "../components/layout";

export default function Home() {
  return (
      <Layout>
          <Head>
              <title>Polls2.0</title>
          </Head>
          <div>
              <p>Hello World</p>
          </div>
      </Layout>
  )
}
