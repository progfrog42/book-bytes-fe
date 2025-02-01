import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link
                href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&family=Notable&family=Playfair+Display:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                  crossOrigin="anonymous"
            />
        </Head>
      <body>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&family=Playfair+Display:wght@400;700&display=swap');
        </style>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
