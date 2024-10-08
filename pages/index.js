/* eslint-disable @next/next/no-img-element */
// Next, React
import Head from "next/head"

import styles from "../ui/styles/Home.module.css"

import authMethods from "../ui/components/auth"
import {  useState } from "react"

function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  function handleClose() {
    setIsLoading(false)
  }
  const methods = authMethods({setIsLoading,handleClose})
  function handleLogin() {
    methods.login();
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Internet Computer</title>
      </Head>
      <main className={styles.main}>
        <h3 className={styles.title}>
          Welcome to Next.js Internet Computer Starter Template!
        </h3>
        <button disabled={isLoading} onClick={handleLogin}>Login</button>
        

        <img src="/logo.png" alt="DFINITY logo" className={styles.logo} />

        {/* <GreetingSection /> */}
        {/* <ImageSection /> */}
      </main>
    </div>
  )
}

export default HomePage
