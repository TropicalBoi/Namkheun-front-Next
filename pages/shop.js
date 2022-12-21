import React, { useState, useEffect } from "react";
import Layout from "../src/components/layout";
import { fetchingProjectDeatail } from "../src/APIs/projectBodyAPIs";
import { replaceTags, defaultString } from "../src/components/commonFn";
import style from "../styles/shop.module.css";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const Shop = () => {
  const [shopDetails, setShopDetails] = useState([]);

  const fetch = async () => {
    try {
      const itemsData = await fetchingProjectDeatail("shops");

      const allItemsData = itemsData.map((data) => {
        const itemData = {
          id: data.id,
          displayImage: data.attributes.DisplayImage.data[0].attributes.url,
          title: data.attributes.ItemName_TH,
          content: replaceTags(
            defaultString(data.attributes.ItemMainDetail_TH)
          ),
          pin: data.attributes.Pin,
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

  return (
    <Layout>
      <div className={style.shopContainer}>
        <div className={style.shopWrapper}>
          {shopDetails.map((item) => {
            if (item.pin) {
              return (
                <div key={item.id}>
                  <Link href={`/shop/${item.id}`}>
                    <div
                      className={style.itemContainer}
                      key={item.displayImage}
                    >
                      <picture>
                        <img
                          src={item.displayImage}
                          className={style.itemDisplayImage}
                          alt="Item display"
                        />
                      </picture>

                      <div className={style.itemDetail} key={item.title}>
                        <div>
                          <h2>
                            <picture>
                              <img
                                src="/NK_Pin.png"
                                className={style.pin}
                                alt="pin"
                              />
                            </picture>
                            {item.title}
                          </h2>
                          <ReactMarkdown>{item.content}</ReactMarkdown>
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
                    </div>
                  </Link>
                </div>
              );
            }
            return;
          })}
          {shopDetails
            .sort((a, b) => {
              return b.id - a.id;
            })
            .map((item) => {
              if (!item.pin) {
                return (
                  <div key={item.id}>
                    <Link href={`/shop/${item.id}`}>
                      <div
                        className={style.itemContainer}
                        key={item.displayImage}
                      >
                        <picture>
                          <img
                            src={item.displayImage}
                            className={style.itemDisplayImage}
                            alt="Item display"
                          />
                        </picture>

                        <div className={style.itemDetail} key={item.title}>
                          <div>
                            <h2>{item.title}</h2>
                            <ReactMarkdown>{item.content}</ReactMarkdown>
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
                      </div>
                    </Link>
                  </div>
                );
              }
              return;
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
