import Link from "next/link"

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Hellow World</p>
      Click <Link href="/documents/123"><span className="text-blue-500 underline">here</span></Link>
    </div>
  )
}

export default Home