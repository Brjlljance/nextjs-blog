import Script from "next/script";
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
const scriptName = 'id'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params[scriptName]);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds(scriptName);

  return {
    paths,
    fallback: false,
  };
}

function getScript() {
  return (
    <Script
      src="https://connect.facebook.net/en_US/sdk.js"
      strategy="lazyOnload"
      onLoad={() =>
      console.log(`script loaded correctly, window.FB has been populated`)}
    />
  )
}

export default function Post({ postData }) {
  return (<>
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  </>);
}