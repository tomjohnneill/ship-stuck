// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const API_KEY = process.env.nyt_api_key;

export default async (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=240, stale-while-revalidate");
  res.status(200).json({ stuck: "No." });
};
