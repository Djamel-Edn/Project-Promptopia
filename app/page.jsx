import Feed from "@components/feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className=" head_text text-center">
        Discover and share 
        <br  className="max-md:hidden"/>
        <span className="orange_gradient text-center">Ai Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        promtopia is an open source AI prompting tool for modern world to discover and share AI prompts.
      </p>
      <Feed/>
    </section>
  )
}

export default Home