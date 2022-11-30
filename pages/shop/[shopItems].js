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

const ShopItem = () => {
  const router = useRouter();

  const [itemInfo, setItemInfo] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      const fetch = async () => {
        try {
          const id = router.query.shopItems;

          const data = await axios.get(
            `https://namkheun-back.herokuapp.com/api/shops/${id}?populate=*`
          );

          const rawData = data.data.data;

          const itemData = {
            displayImage:
              rawData.attributes.DisplayImage.data[0].attributes.url,
            title: rawData.attributes.ItemName,
            content: replaceTags(
              defaultString(rawData.attributes.ItemMainDetail)
            ),
            moreContent: replaceTags(
              defaultString(rawData.attributes.ItemMoreDetail)
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
  }, [router.isReady]);

  const clean = (input) => {
    return { __html: input };
  };

  return (
    <Layout>
      <div className={style.itemContainer}>
        <div className={style.imageContainer}>
          <picture>
            <img
              src={itemInfo.displayImage}
              className={style.itemImg}
              alt="item image"
            />
          </picture>
        </div>
        <div className={style.mainDetail}>
          <div>
            <p>{itemInfo.title}</p>
            <p dangerouslySetInnerHTML={clean(itemInfo.content)} />
          </div>
          <a
            target="_blank"
            href={addHTTP(itemInfo.purchaseLink)}
            rel="noopener noreferrer"
          >
            <button>Purchase here</button>
          </a>
        </div>

        <div className={style.moreDetail}>
          <br />
          <br />
          <p dangerouslySetInnerHTML={clean(itemInfo.moreContent)} />
        </div>
      </div>
    </Layout>
  );
};

export default ShopItem;