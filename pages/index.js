import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";

const minute = 1000 * 60;
const hour = 60 * minute;
const day = 24 * hour;
function formatNumber(num) {
  console.log({ num });
  return `$${Math.round(num / 1000000000).toString()} billion`;
}

const bookLinks = [
  {
    link:
      "https://www.amazon.com/gp/product/0691170819/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0691170819&linkCode=as2&tag=istheshipstil-20&linkId=6d33695f2c14c9f1bf40ee397713997e",
    ukLink:
      "https://www.amazon.co.uk/gp/product/0691170819/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0691170819&linkCode=as2&tag=istheshipstil-21&linkId=9332ba80ee7763ffdb4af0bee2883cb7",
    title: "The Box - Marc Levinson",
    subtitle: "How the Shipping Container Made the World Smaller",
    image: "/smallerbox.jfif",
    description: "The Citizen Kane of books about shipping.",
  },
  {
    ukLink:
      "https://www.amazon.co.uk/gp/product/1783962437/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1783962437&linkCode=as2&tag=istheshipstil-21&linkId=f5ebc770e11dfcd130d1434c3c3d867c",
    link:
      "https://www.amazon.com/gp/product/1501121472/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1501121472&linkCode=as2&tag=istheshipstil-20&linkId=fc8fdb11b99567d772fcf27f914abf44",

    title: "Prisoners of Geography - Tim Marshall",
    subtitle:
      "Ten Maps That Tell You Everything You Need To Know About Global Politics",
    description:
      "How do things like shipping lanes affect who goes to war with whom?",
    image: "/prisoners.jpg",
  },
  {
    ukLink:
      "https://www.amazon.co.uk/gp/product/0802144160?ie=UTF8&linkCode=ll1&tag=istheshipstil-21&linkId=28daf238a6b893d7174d6383591b1d8a&language=en_GB&ref_=as_li_ss_tl",
    link:
      "https://www.amazon.com/gp/product/0802144160/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0802144160&linkCode=as2&tag=istheshipstil-20&linkId=790344b5b95464d8f300581020eeeb3d",
    title: "A Splendid Exchange - William Bernstein",
    subtitle: "How Trade Shaped the World",
    image: "/splendid.jpg",
    description:
      "A lot more historical, with a focus on how trade and globalisation has always existed in some form.",
  },
];

const generateTimeString = (diff) => {
  const days = Math.floor(diff / day);
  const hours = Math.floor((diff - days * day) / hour);
  const minutes = Math.floor((diff - days * day - hours * hour) / minute);

  if (hours === 0) {
    return `for ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  } else {
    return `for ${days} days, ${hours} ${
      hours === 1 ? "hour" : "hours"
    } and ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }
};

export default function Home(props) {
  const [articles, setArticles] = useState([]);

  console.log({ articles });

  const suezTime = new Date("2021-03-23T09:40:00.000Z");
  const floatTime = new Date("2021-03-29T03:42:00.00Z");
  const now = new Date();
  const diff = now - suezTime;
  const floatDiff = now - floatTime;

  const [isUK, setIsUK] = useState(false);

  useEffect(() => {
    setTimeout(
      () =>
        (window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"),
      60000
    );
  }, []);

  console.log({ diff });
  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator) {
      const { languages } = window.navigator;
      if (languages?.[0] === "en-GB") {
        setIsUK(true);
      }
    }
  }, [typeof window]);

  const days = Math.floor(diff / day);
  const hours = Math.floor((diff - days * day) / hour);
  const minutes = Math.floor((diff - days * day - hours * hour) / minute);
  const hoursConversion = Math.floor(
    (days * 24 + hours + minutes / 60) * 400000000
  ); //https://www.cnbc.com/2021/03/25/suez-canal-blockage-is-delaying-an-estimated-400-million-an-hour-in-goods.html
  const costText = `It has cost us ${formatNumber(hoursConversion)}, so far...`;

  const durationText = `It was very stuck ${generateTimeString(
    diff
  )}. It's been floating a bit ${generateTimeString(floatDiff)}`;

  useEffect(() => {
    fetch("/api/times")
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, []);

  const [easterEgg, setEasterEgg] = useState(false);

  const sequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  const currentKey = useRef(0);

  const konami = (event) => {
    if (event.key === sequence[currentKey.current]) {
      if (currentKey.current === 9) {
        setEasterEgg(true);
        currentKey.current = 0;
      } else {
        currentKey.current++;
      }
    } else {
      setEasterEgg(false);
      currentKey.current = 0;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", konami);
    return () => window.removeEventListener("keydown", konami);
  });

  useEffect(() => {
    if (easterEgg) {
      window.location.href = "http://epicport.com/en/ttd";
    }
  }, [easterEgg]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Is the ship still stuck?</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tomjneill" />
        <meta name="twitter:creator" content="@tomjneill" />
        <meta name="twitter:title" content="Is this ship still stuck?" />
        <meta
          name="twitter:description"
          content="You know that ship, the one possibly still stuck in the canal. Is it still there? Find out that, and really only that, at this website."
        />
        <meta
          name="twitter:image"
          content="https://istheshipstillstuck.com/ever-given.jpg"
        />
        <meta
          property="og:image"
          content="https://istheshipstillstuck.com/ever-given.jpg"
        />
        <meta name="twitter:image:alt" content="That ship" />
        <meta
          property="og:description"
          content="You know that ship, the one possibly still stuck in the canal. Is it still there? Find out that, and really only that, at this website."
        />
        <meta property="og:title" content="Is this ship still stuck?" />
        <meta property="og:url" content={"https://istheshipstillstuck.com"} />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Is that ship still stuck?</h1>

        <p className={styles.description}>No!</p>
        <p>
          <a
            href="https://xkcd.com/611/"
            target="_blank"
            rel="noopener noreferrer"
          >
            What a relief.
          </a>
        </p>
        <a
          style={{ marginTop: 8 }}
          href="https://twitter.com/tomjneill?ref_src=twsrc%5Etfw"
          class="twitter-follow-button"
          data-show-count="false"
        >
          Follow @tomjneill
        </a>

        <p style={{ textAlign: "center" }}>
          {durationText}. <br />
          <a
            href="https://www.cnbc.com/2021/03/25/suez-canal-blockage-is-delaying-an-estimated-400-million-an-hour-in-goods.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            {costText}
          </a>
        </p>

        <div style={{ width: "100%", maxWidth: 600 }}>
          <div
            dangerouslySetInnerHTML={{
              __html: `<script type="text/javascript">
  var width="100%";var height="400";var zoom="14";
  var mmsi=353136000;
</script><script type="text/javascript" src="https://www.vesselfinder.com/aismap.js"></script>`,
            }}
          />
          <div style={{ width: "100%", textAlign: "right" }}>
            <p
              style={{
                opacity: "60%",
                marginTop: 0,
                marginBottom: 0,
                fontSize: "12px",
              }}
            >
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
              >
                © OpenStreetMap contributors
              </a>
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 600, width: "100%", margin: "auto" }}>
          <h3 style={{ fontSize: "24px", marginBottom: 0, marginTop: 48 }}>
            Some good books on the topic
          </h3>
          <p style={{ opacity: "80%", fontSize: "12px", marginBottom: 16 }}>
            These are affiliate links, I get a small fee if you buy one which
            will help cover the cost of hosting this site. I have no connection
            to the authors, I just liked their books.
          </p>

          {bookLinks.map((item) => (
            <a
              href={isUK ? item.ukLink : item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                borderRadius: 6,
                overflow: "hidden",
                marginBottom: 16,
                border: "1px solid #DBDBDB",
              }}
            >
              <img src={item.image} style={{ height: 120 }} />
              <div
                style={{
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 12,
                  paddingRight: 8,
                }}
              >
                <div style={{ fontWeight: 600 }}>{item.title}</div>
                <div style={{ opacity: "80%" }}>{item.subtitle}</div>
                <p className="book-description">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
        <h3
          style={{
            textAlign: "left",
            width: "100%",
            maxWidth: 500,
            margin: "auto",
            marginBottom: 16,
            marginTop: 48,
            alignItems: "center",
            fontSize: "24px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Latest headlines
          <img src="https://developer.nytimes.com/files/poweredby_nytimes_200c.png" />
        </h3>
        <div className={styles.grid}>
          {articles?.slice(0, 3)?.map((article) => (
            <a href={article.web_url} key={article._id}>
              <section
                style={{
                  maxWidth: 500,
                  borderRadius: 4,
                  overflow: "hidden",
                  marginBottom: 32,
                  border: "1px solid #DBDBDB",
                }}
              >
                {article.multimedia[0]?.url ? (
                  <img
                    src={`https://nytimes.com/${article.multimedia[0]?.url}`}
                    style={{
                      width: "100%",
                      height: 250,
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/New_York_Times_logo_variation.jpg/960px-New_York_Times_logo_variation.jpg"
                      alt="NYT Logo"
                      style={{
                        width: 200,
                        marginX: "auto",
                      }}
                    />
                  </div>
                )}

                <div style={{ padding: 12 }}>
                  <h2 style={{ marginTop: 0 }}>{article.headline.main}</h2>
                  <span style={{ opacity: "60%" }}>
                    Published: {new Date(article.pub_date).toLocaleString()}
                  </span>
                  <p>{article.snippet}</p>
                </div>
              </section>
            </a>
          ))}
        </div>
      </main>

      <a
        href="https://simpleanalytics.com/istheshipstillstuck.com?utm_source=istheshipstillstuck.com&utm_content=badge"
        referrerpolicy="origin"
        target="_blank"
      >
        <img
          style={{ marginBottom: 16 }}
          src="https://simpleanalyticsbadge.com/istheshipstillstuck.com"
          loading="lazy"
          referrerpolicy="no-referrer"
          crossorigin="anonymous"
        />
      </a>

      <footer className={styles.footer}>
        To be peak 2021:
        <a
          href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/39548461347666529560377967944030380563003576059826604202233011364559964864513"
          target="_blank"
          style={{
            border: "1px solid #DBDBDB",
            borderRadius: 4,
            padding: 4,
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            margin: "8px 0px",
          }}
          rel="noopener norferrer"
        >
          <img
            style={{ height: 24, marginRight: 8 }}
            src="https://opensea.io/static/images/logos/opensea-logo.png"
            alt="opensea"
          />
          Bid on the NFT of this page (on *OpenSea*)
        </a>
        <a
          href="https://xkcd.com/937/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
            <span style={{ color: "blue" }}>Tornado Guard</span> warnings apply.
          </p>
        </a>
      </footer>
      <style jsx>
        {`
          .book-description {
            opacity: 80%;
            font-size: 14px;
            margin-bottom: 0;
            margin-top: 8;
          }

          @media only screen and (max-width: 600px) {
            .book-description {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

/*
export async function getStaticProps() {
  const articles = await fetchData()
    .then((response) => response.json())
    .then((data) => {
      if (data?.response?.docs) {
        return data?.response?.docs;
      } else {
        console.log({ data });
        return [];
      }
    });

  return {
    props: { articles },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every second
    revalidate: 150,
  };
}
*/
