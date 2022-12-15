import React, { useState } from "react";
import Layout from "../src/components/layout";
import style from "../styles/about.module.css";

const About = () => {
  const [thaiText, setThaiText] = useState();

  return (
    <Layout>
      <div className={style.aboutContainer}>
        <div className={style.aboutSection}>
          <div className={style.aboutInfo}>
            <div className={style.languageSection}>
              {thaiText && (
                <p
                  className={style.languageOnHover}
                  onClick={() => setThaiText(!thaiText)}
                >
                  EN
                </p>
              )}
              {!thaiText && <p className={style.languageOnActive}>EN</p>}
              <p>&nbsp;|&nbsp;</p>
              {!thaiText && (
                <p
                  className={style.languageOnHover}
                  onClick={() => setThaiText(!thaiText)}
                >
                  TH
                </p>
              )}
              {thaiText && <p className={style.languageOnActive}>TH</p>}
            </div>
            {!thaiText && (
              <p className="engTxt">
                Namkheun is translated as ‘rising tides’,
                <span> (น้ำขึ้น) </span>
                is a literary collective based in Bangkok, Thailand.
                <br></br>
                <br></br>
                Namkheun is a product of disgruntled text exchanges and
                over-the-phone gossip sessions between two friends over the
                years. Together, we raged over the state of the world. Together,
                we shared memes, unfulfilled dreams, and personal insights. And
                so in 2020,
                <br></br>
                <br></br>
                Namkheun materialised as an extension of such activities, an
                open chat if you will.
                <br></br>
                <br></br>
              </p>
            )}

            {thaiText && (
              <p className="thaiTxt">
                น้ำขึ้นเป็นคอลเลคทีฟที่ทำงานกับตัวหนังสือ
                น้ำขึ้นก่อตัวจากการเม้ามอยโฟ่ฝอยระหว่าง
                เพื่อนสนิทสองคนตลอดระยะเวลาหลายปีที่ผ่านมา(และก็ยังคงเป็นอย่างนั้นแหละ)
                เราบ่น เราฉอด
                เราฟาดสารพัดสิ่งเพราะทุกเรื่องที่(ไม่)มีสาระเริ่มต้นด้วย “มึงง”
                และจบด้วย “อีดอก” เราส่งมีม ส่งต่อความคลั่งรักส์
                ความในจัยและความฝันเพ้อพก
                ถึงน้ำขึ้นคอลเลคทีฟจะมีตัวตนขึ้นมาเมื่อปี 2020 ที่ผ่านมา
                เท่านั้นเอง
                เราก็มองว่าน้ำขึ้นคือส่วนขยายของสารพัดสิ่งที่เราทำด้วยกันอยู่แล้ว
                เป็นเหมือนโอเพ่นแชทก็ได้
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
