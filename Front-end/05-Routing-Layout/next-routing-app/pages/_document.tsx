//SPA(SingleWebPageApplication)의 실체인 싱글 페이지를 구성하는 HTML을 커스터마이징 할 수 있는 파일




import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
