import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";
import UIfx from "uifx";
import foghorn from "../public/foghorn.mp3";

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
      "https://www.amazon.co.uk/gp/product/1408839997/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1408839997&linkCode=as2&tag=istheshipstil-21&linkId=d97d754bdae748a2e3abaca846789ce5",
    link:
      "https://www.amazon.com/gp/product/1101912375/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1101912375&linkCode=as2&tag=istheshipstil-20&linkId=df76d618fd4dcf98e04f72cbaf62575e",
    title: "The Silk Roads - Peter Frankopan",
    subtitle: "A New History of the World",
    image: "/silkroads.jpg",
    description:
      "A bit more knowledge of some historical trade routes could come in handy next time there's a massive ship blocking a canal.",
  },
  {
    ukLink:
      "https://www.amazon.co.uk/gp/product/1846272998/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1846272998&linkCode=as2&tag=istheshipstil-21&linkId=e49e81bbdaa5b64220a3879fd0e28e08",
    link:
      "https://www.amazon.com/gp/product/1250058295/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1250058295&linkCode=as2&tag=istheshipstil-20&linkId=7b4ccbbfdd7f6ce5b150d333bf13c769",
    title: "Deep Sea and Foreign Going - Rose George",
    subtitle:
      "Inside Shipping, the Invisible Industry that Brings You 90% of Everything",
    image: "/deepsea.jpg",
    description: "An account of what life is actually like on a cargo ship.",
  },
  {
    ukLink:
      "https://www.amazon.co.uk/Invisible-Hook-Hidden-Economics-Pirates/dp/0691150095?dchild=1&keywords=invisible+hook+pirates&qid=1617033100&sr=8-1&linkCode=ll1&tag=istheshipstil-21&linkId=21d9eb0609ce262e09da85d7861575b5&language=en_GB&ref_=as_li_ss_tl",
    link:
      "https://www.amazon.com/gp/product/0691150095/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0691150095&linkCode=as2&tag=istheshipstil-20&linkId=f2663da8713528b4910d06a037b53c06",
    title: "The Invisible Hook - Peter Leeson",
    subtitle: "The Hidden Economics of Pirates",
    image: "/pirates.jpg",
    description:
      "Not exactly related to canals... but everyone likes reading stuff about pirates right?",
  },

  {
    ukLink:
      "https://www.amazon.co.uk/Ocean-Life-Fate-Man-Sea/dp/0143123483?dchild=1&keywords=ocean+of+life&qid=1617033156&sr=8-1&linkCode=ll1&tag=istheshipstil-21&linkId=543a526b323b153e4fbeeac668d64ef6&language=en_GB&ref_=as_li_ss_tl",
    link:
      "https://www.amazon.com/Ocean-Life-Fate-Man-Sea/dp/0143123483?crid=36WFME10YV1LE&dchild=1&keywords=ocean+of+life+callum+roberts&qid=1617033221&sprefix=ocean+of+life%2Caps%2C220&sr=8-1&linkCode=ll1&tag=istheshipstil-20&linkId=3c15b6103e985ed1c0703530a81e3e0d&language=en_US&ref_=as_li_ss_tl",
    title: "The Ocean of Life",
    subtitle: "The Fate of Man and the Sea",
    image: "/ocena.jpg",
    description:
      "A book about how important the ocean is. Made me want to buy up a big patch of it and turn it all into national parks.",
  },
];

const generateTimeString = (diff) => {
  const days = Math.floor(diff / day);
  const hours = Math.floor((diff - days * day) / hour);
  const minutes = Math.floor((diff - days * day - hours * hour) / minute);

  if (days === 0) {
    return `for ${hours} ${hours === 1 ? "hour" : "hours"} and ${minutes} ${
      minutes === 1 ? "minute" : "minutes"
    }`;
  } else {
    return `for ${days} days, ${hours} ${
      hours === 1 ? "hour" : "hours"
    } and ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }
};

export default function Home(props) {
  const [articles, setArticles] = useState([]);
  const [boatHorn, setBoatHorn] = useState({});

  console.log({ articles });

  const suezTime = new Date("2021-03-23T09:40:00.000Z");
  // TO DO: UPDATE WITH FREE TIME
  const freeTime = new Date("2021-03-29T13:18:00.00Z");
  const diff = freeTime - suezTime;

  const [isUK, setIsUK] = useState(false);

  useEffect(() => {
    let link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    if (Math.random() > 0.999) {
      link = "https://www.youtube.com/watch?v=jPCJIB1f7jk";
    }
    setTimeout(() => (window.location.href = link), 90000);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator) {
      const { languages } = window.navigator;
      if (languages?.[0] === "en-GB") {
        setIsUK(true);
      }

      setBoatHorn(
        new UIfx(foghorn, {
          volume: 0.5,
          throttleMs: 100,
        })
      );
    }
  }, [typeof window]);

  console.log({ diff });

  const days = Math.floor(diff / day);
  const hours = Math.floor((diff - days * day) / hour);
  const minutes = Math.floor((diff - days * day - hours * hour) / minute);
  const hoursConversion = Math.floor(
    (days * 24 + hours + minutes / 60) * 400000000
  ); //https://www.cnbc.com/2021/03/25/suez-canal-blockage-is-delaying-an-estimated-400-million-an-hour-in-goods.html
  const costText = `It (probably) cost "us" ${formatNumber(hoursConversion)}.`;

  const durationText = `It was stuck ${generateTimeString(diff)}`;

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

        <p className={styles.description} onClick={() => boatHorn.play()}>
          No!
        </p>
        <p>
          <a
            style={{ textDecoration: "underline" }}
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
          <>
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
          </>
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
          href="https://timetospare.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
            When not ship watching, I spend my time at{" "}
            <span style={{ color: "blue" }}>Time to Spare</span>.
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
