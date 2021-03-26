// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const API_KEY = process.env.nyt_api_key;

export default async (req, res) => {
  const result = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=subject%3A"Ships%20and%20Shipping"%20AND%20glocations%3A"Suez%20Canal" AND pub_year:2021&sort=newest&page=0&api-key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data?.response?.docs) {
        return data?.response?.docs;
      } else {
        console.log({ data });
        return [];
      }
    });
  res.setHeader("Cache-Control", "s-maxage=240, stale-while-revalidate");
  res.status(200).json(result);
};
