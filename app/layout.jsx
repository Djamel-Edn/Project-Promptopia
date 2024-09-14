import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'
export const metadata = {
    title:"promptopia",
    description:'Discover & share AI Prompts'
}
const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <head>
        <link rel="icon" href="/log.ico" type="image/svg+xml"/> 
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
        <body>
          <Provider>

            <div className='main'>
              <div className='gradient'/>
            </div>
            <main className='app'>
              <Nav/>
              {children}
            </main>
          </Provider>
        </body>
    </html>
  )
}

export default RootLayout