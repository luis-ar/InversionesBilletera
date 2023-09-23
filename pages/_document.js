import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBB2CViIy1tu-h-NbBqKkNT97q68K6jgww&callback=initMap"
            async
            defer
          ></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
