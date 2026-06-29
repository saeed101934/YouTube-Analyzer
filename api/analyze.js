import { getChannelById, searchChannel } from "./youtube.js";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Please provide a YouTube channel URL."
      });
    }

    let channelId = "";

    // Channel ID URL
    if (url.includes("/channel/")) {
      channelId = url.split("/channel/")[1].split("/")[0];
    }

    // @username URL
    else if (url.includes("/@")) {
      const username = url.split("/@")[1].split("/")[0];
      channelId = await searchChannel(username);
    }

    // Custom URL
    else {
      return res.status(400).json({
        success: false,
        message: "Unsupported YouTube URL."
      });
    }

    
    const channel = await getChannelById(channelId);

res.status(200).json({
  success: true,
  niche: "General",
  rpm: "5.50",
  estimatedMonthlyRevenue: "$500 - $1000",
  seoScore: 85,
  growthScore: 80,
  uploadTime: "6 PM - 9 PM",
  keywords: [
    "youtube",
    "growth",
    "seo",
    "ai"
  ]
});

} catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error"
  });
}
}
