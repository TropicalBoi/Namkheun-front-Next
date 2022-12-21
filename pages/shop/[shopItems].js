import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../src/components/layout";
import {
  replaceTags,
  defaultString,
  addHTTP,
} from "../../src/components/commonFn";
import style from "../../styles/shopItem.module.css";
import ReactMarkdown from "react-markdown";

const ShopItem = () => {
  const router = useRouter();

  const [itemInfo, setItemInfo] = useState([]);

  const [engText, setEngText] = useState();

  const [thaiOnly, setThaiOnly] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      const fetch = async () => {
        try {
          const id = router.query.shopItems;

          let data = null;

          try {
            data = await axios.get(
              `https://namkheun-back.herokuapp.com/api/shops/${id}?populate=*`
            );
          } catch (err) {
            if (err.response.status == 404) {
              router.push("/404");
            }
          }

          const rawData = data.data.data;

          if (rawData.attributes.ItemMainDetail_EN) {
            setThaiOnly(false);
          }

          const itemData = {
            displayImage:
              rawData.attributes.DisplayImage.data[0].attributes.url,
            title: rawData.attributes.ItemName_EN,
            titleTH: rawData.attributes.ItemName_TH,
            content: replaceTags(
              defaultString(rawData.attributes.ItemMainDetail_EN)
            ),
            contentTH: replaceTags(
              defaultString(rawData.attributes.ItemMainDetail_TH)
            ),
            moreContent: replaceTags(
              defaultString(rawData.attributes.ItemMoreDetail_EN)
            ),
            moreContentTH: replaceTags(
              defaultString(rawData.attributes.ItemMoreDetail_TH)
            ),
            purchaseLink: rawData.attributes.PurchaseLink,
          };

          setItemInfo(itemData);
        } catch (e) {
          console.log(e);
        }
      };

      fetch();
    }
  }, [router, router.isReady]);

  return (
    <Layout>
      <div className={style.itemContainer}>
        <picture>
          <img
            src={itemInfo.displayImage}
            className={style.itemImg}
            alt="item image"
          />
        </picture>
        <div className={style.mainDetail}>
          <div>
            {!thaiOnly ? (
              <div className={style.languageSection}>
                {!engText && (
                  <p
                    className={style.languageOnHover}
                    onClick={() => setEngText(!engText)}
                  >
                    EN
                  </p>
                )}
                {engText && <p className={style.languageOnActive}>EN</p>}
                <p>&nbsp;|&nbsp;</p>
                {engText && (
                  <p
                    className={style.languageOnHover}
                    onClick={() => setEngText(!engText)}
                  >
                    TH
                  </p>
                )}
                {!engText && <p className={style.languageOnActive}>TH</p>}
              </div>
            ) : (
              ""
            )}
            {!thaiOnly ? <br /> : ""}
            {!engText ? <p>{itemInfo.titleTH}</p> : <p>{itemInfo.title}</p>}

            <ReactMarkdown>
              {!engText ? itemInfo.contentTH : itemInfo.content}
            </ReactMarkdown>
          </div>
          {itemInfo.purchaseLink ? (
            <a
              target="_blank"
              href={addHTTP(itemInfo.purchaseLink)}
              rel="noopener noreferrer"
            >
              <button>Purchase here</button>
            </a>
          ) : (
            ""
          )}
        </div>

        <div className={style.moreDetail}>
          <br />
          <br />
          <ReactMarkdown>
            {!engText ? itemInfo.moreContentTH : itemInfo.moreContent}
          </ReactMarkdown>
          <br />
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ShopItem;
