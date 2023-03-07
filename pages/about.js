import React, { useState } from "react";
import Layout from "../src/components/layout";
import style from "../styles/about.module.css";

const About = () => {
  const [engText, setEngText] = useState();

  return (
    <Layout>
      <div className={style.aboutContainer}>
        <div className={style.aboutSection}>
          <div className={style.aboutInfo}>
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
            {engText && (
              <p className="engTxt">
                Translated as ‘Rising Tides’,
                <span> (น้ำขึ้น) </span>
                is a literary collective based in Bangkok, Thailand.
                <br></br>
                <br></br>
                Namkheun is a product of disgruntled text exchanges and
                over-the-phone gossip sessions between two friends over the
                years. Together, we raged over the state of the world. Together,
                we shared memes, unfulfilled dreams, and personal insights. And
                so in 2020, Namkheun materialised as an extension of such
                activities, an open chat if you will.
                <br></br>
                <br></br>
              </p>
            )}

            {!engText && (
              <p className="thaiTxt">
                น้ำขึ้นเป็นคอลเลคทีฟที่ทำงานกับตัวหนังสือ
                น้ำขึ้นก่อตัวจากการเม้ามอยโฟ่ฝอยระหว่างเพื่อนสนิทสองคนตลอดระยะเวลาหลายปีที่ผ่านมา
                (และก็ยังคงเป็นอย่างนั้นแหละ) เราบ่น เราฉอด เราฟาดสารพัดสิ่ง
                เพราะทุกเรื่องที่(ไม่)มีสาระเริ่มต้นด้วย “มึงง” และจบด้วย
                “อีดอก” เราส่งมีม ส่งต่อความคลั่งรักส์ ความในจัยและความฝันเพ้อพก
                ถึงน้ำขึ้นคอลเลคทีฟจะมีตัวตนขึ้นมาเมื่อปี 2020
                ที่ผ่านมาเท่านั้นเอง
                เราก็มองว่าน้ำขึ้นคือส่วนขยายของสารพัดสิ่งที่เราทำด้วยกันอยู่แล้ว
                จะเป็นโอเพ่นแชทก็ได้
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
