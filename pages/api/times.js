// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const API_KEY = "31oqGAKAzvnlM051Ll25mEZLwWHNmvxJ";

export default async () => {
  return fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:("Suez Canal") AND pub_year:2021&sort=newest&api-key=${API_KEY}`
  );
};
