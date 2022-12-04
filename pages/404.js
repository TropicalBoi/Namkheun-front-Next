import Layout from "../src/components/layout";
import style from "../styles/notFound.module.css";
import Link from "next/link";

const NotFound = () => {
  return (
    <Layout>
      <div className={style.notFoundBody}>
        <h2>404, Page not found.</h2>
        <Link href="/">
          <p> Go back to the Homepage </p>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
