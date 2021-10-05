import Head from 'next/head'
import Link from "next/link";
export default function Home() {
  return (
    <div style={{
      padding:"10px"
    }}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ol>
        <li>
          <Link href="/default-editor">
            default editor
          </Link>
        </li>
        <li>
          <Link href="/custom-editor">
            custom editor
          </Link>
        </li>
      </ol>
    </div>
  )
}
