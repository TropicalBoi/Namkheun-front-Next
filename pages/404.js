import Layout from "../src/components/layout";
import style from "../styles/notFound.module.css";
import Link from "next/link";

const NotFound = () => {
  return (
    <Layout>
      <div className={style.notFoundBody}>
        <div className={style.notFoundWrapper}>
          <h2>404,</h2>
          <h2>&nbsp;Page not found</h2>
          <picture>
            <img
              src="/NK_NotFound.png"
              className={style.notFoundIcon}
              alt="Page not found"
            />
          </picture>
        </div>
        <Link href="/">
          <p> Go back to the Homepage </p>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
