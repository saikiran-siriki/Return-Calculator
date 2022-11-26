import Head from 'next/head'

function IndexPage({title, description, image}:{title:string, description:string, image: string} ) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#976eb1" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image}/>
      </Head>
    </div>
  )
}

export default IndexPage