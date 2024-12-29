import '../src/globals.css';  // Import global styles
import { useEffect } from 'react';
import Head from 'next/head';   // Import Next.js Head component

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Register Service Worker only in production
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        }
    }, []);

    return (
        <>
            <Head>
                {/* Link to the Web App Manifest */}
                <link rel="manifest" href="/manifest.json" />
                {/* Add other meta tags and links for PWA */}
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Your app description here" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
