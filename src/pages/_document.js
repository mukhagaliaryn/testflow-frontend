import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends  Document {

    static async getInitialProps(ctx) {
        
        const initialProps = await Document.getInitialProps(ctx) 
            return { ...initialProps }
    }

    render() {

        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/images/flow.png" type="image/x-icon" />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </ Html>
        );
    }
}