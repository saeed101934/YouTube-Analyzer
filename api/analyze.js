export default async function handler(req, res) {

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Please provide a YouTube URL"
    });
  }

  let niche = "General";
  const text = url.toLowerCase();

  if (text.includes("psychology")) niche = "Psychology";
  else if (text.includes("finance")) niche = "Finance";
  else if (text.includes("tech")) niche = "Technology";
  else if (text.includes("gaming")) niche = "Gaming";
  else if (text.includes("food")) niche = "Food";
  else if (text.includes("fitness")) niche = "Fitness";

  const rpm = (Math.random() * 6 + 2).toFixed(2);
  const monthlyViews = Math.floor(Math.random() * 5000000) + 100000;

  const monthlyRevenueLow = Math.round(monthlyViews / 1000 * rpm * 0.6);
  const monthlyRevenueHigh = Math.round(monthlyViews / 1000 * rpm * 1.2);

  res.status(200).json({

    success: true,

    niche,

    rpm,

    estimatedMonthlyViews: monthlyViews,

    estimatedMonthlyRevenue:
      `$${monthlyRevenueLow} - $${monthlyRevenueHigh}`,

    seoScore: Math.floor(Math.random()*20)+80,

    growthScore: Math.floor(Math.random()*20)+75,

    uploadTime: "6 PM - 9 PM",

    keywords: [
      "psychology",
      "facts",
      "human behavior",
      "self improvement"
    ]

  });

}
