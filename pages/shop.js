import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import axios from "axios";
import { replaceTags, defaultString } from "../src/components/commonFn";
import style from "../styles/shop.module.css";
import Link from "next/link";

const Shop = () => {
  const [shopDetails, setShopDetails] = useState([]);

  const fetch = async () => {
    try {
      const shopRawData = await axios.get(
        `https://namkheun-back.herokuapp.com/api/shops?populate=%2A`
      );

      const itemsData = shopRawData.data.data;

      const allItemsData = itemsData.map((data) => {
        const itemData = {
          id: data.id,
          displayImage: data.attributes.DisplayImage.data[0].attributes.url,
          title: data.attributes.ItemName,
          content: replaceTags(defaultString(data.attributes.ItemMainDetail)),
        };

        return itemData;
      });
      setShopDetails(allItemsData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const clean = (input) => {
    return { __html: input.content };
  };

  return (
    <Layout>
      <div className={style.shopContainer}>
        {shopDetails
          .sort((a, b) => {
            return b.id - a.id;
          })
          .map((item) => {
            return (
              <div className={style.itemContainer} key={item.id}>
                <Link href={`/shop/${item.id}`}>
                  <div className={style.imgContainer} key={item.displayImage}>
                    <picture>
                      <img
                        src={item.displayImage}
                        className={style.itemDisplayImage}
                        alt="Item display"
                      />
                    </picture>
                  </div>
                  <div className={style.itemDetail} key={item.title}>
                    <div>
                      <h2>{item.title}</h2>
                      <p dangerouslySetInnerHTML={clean(item)} />
                    </div>
                    <div className={style.itemMoreInfo}>
                      <p>More info</p>
                      <picture>
                        <img
                          src="/NK_Icon-download.svg"
                          className={style.moreInfoIcon}
                          alt="download"
                        />
                      </picture>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Shop;
