// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const API_KEY = "31oqGAKAzvnlM051Ll25mEZLwWHNmvxJ";
//"31oqGAKAzvnlM051Ll25mEZLwWHNmvxJ";

export default async () => {
  return fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=subject%3A"Ships%20and%20Shipping"%20AND%20glocations%3A"Suez%20Canal" AND pub_year:2021&sort=newest&page=0&api-key=${API_KEY}`
  );
};
