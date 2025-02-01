import '@/styles/global.css'
import '@/styles/animation.css'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {wrapper} from "@/store";
import Notifications from "@/components/Notifications";
import NextNProgress from 'nextjs-progressbar';

function App({ Component, pageProps }) {
  return (
      <>
          <NextNProgress
              color="#29D"
              startPosition={0.3}
              stopDelayMs={200}
              height={5}
              showOnShallow={true}
          />
          <Notifications />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
      </>
  )
}

export default wrapper.withRedux(App)
