import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <script
          async
          defer
          src="https://scripts.simpleanalyticscdn.com/latest.js"
        ></script>
        <noscript>
          <img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" />
        </noscript>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
      </Html>
    );
  }
}

export default MyDocument;
