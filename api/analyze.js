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

    // @handle URL
    else if (url.includes("/@")) {
      const username = url.split("/@")[1].split("/")[0];
      channelId = await searchChannel(username);
    }

    else {
      return res.status(400).json({
        success: false,
        message: "Unsupported YouTube URL."
      });
    }

    if (!channelId) {
      return res.status(404).json({
        success: false,
        message: "YouTube channel not found."
      });
    }

    const channel = await getChannelById(channelId);

    if (!channel) {
      return res.status(404).json({
        success: false,
        message: "Unable to fetch channel data."
      });
    }

    // Channel information
 const title = channel.snippet?.title || "";
const description = channel.snippet?.description || "";
    const text = (title + " " + description).toLowerCase();

    // Detect niche from channel title + description
    let niche = "General";

    if (
      text.includes("origami") ||
      text.includes("paper craft") ||
      text.includes("paper crafts") ||
      text.includes("paper folding")
    ) {
      niche = "Paper Crafts & Origami";
    } 
    else if (
      text.includes("gaming") ||
      text.includes("gameplay") ||
      text.includes("games")
    ) {
      niche = "Gaming";
    }
    else if (
      text.includes("fitness") ||
      text.includes("workout") ||
      text.includes("gym")
    ) {
      niche = "Fitness";
    }
    else if (
      text.includes("technology") ||
      text.includes("tech") ||
      text.includes("software")
    ) {
      niche = "Technology";
    }
    else if (
      text.includes("cooking") ||
      text.includes("recipe") ||
      text.includes("food")
    ) {
      niche = "Food & Cooking";
    }
    else if (
      text.includes("education") ||
      text.includes("learning") ||
      text.includes("tutorial")
    ) {
      niche = "Education";
    }

    // Category based on detected niche
    let category = "General";

    if (niche === "Paper Crafts & Origami") {
      category = "Howto & Style";
    }
    else if (niche === "Gaming") {
      category = "Gaming";
    }
    else if (niche === "Fitness") {
      category = "Sports";
    }
    else if (niche === "Technology") {
      category = "Science & Technology";
    }
    else if (niche === "Food & Cooking") {
      category = "Howto & Style";
    }
    else if (niche === "Education") {
      category = "Education";
    }

    // Extract useful keywords
    const keywordList = [];

    const possibleKeywords = [
      "origami",
      "paper crafts",
      "paper craft",
      "paper folding",
      "diy",
      "paper toys",
      "paper flowers",
      "paper animals",
      "tutorial",
      "easy crafts",
      "creative diy",
      "gaming",
      "gameplay",
      "fitness",
      "workout",
      "technology",
      "tech",
      "software",
      "cooking",
      "recipes",
      "education",
      "learning"
    ];

    possibleKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        keywordList.push(keyword);
      }
    });

    if (keywordList.length === 0) {
      keywordList.push(niche.toLowerCase());
    }

    // Basic SEO score based on channel metadata
    let seoScore = 40;

    if (title.length >= 5) seoScore += 15;
    if (description.length >= 100) seoScore += 15;
    if (description.length >= 300) seoScore += 10;
    if (keywordList.length >= 3) seoScore += 10;

    seoScore = Math.min(seoScore, 100);

    // Basic growth score
   const subscribers = Number(channel.statistics?.subscriberCount || 0);
const views = Number(channel.statistics?.viewCount || 0);
const videos = Number(channel.statistics?.videoCount || 0);

    let growthScore = 40;

    if (videos >= 10) growthScore += 10;
    if (views >= 1000) growthScore += 10;
    if (views >= 5000) growthScore += 10;
    if (subscribers >= 100) growthScore += 10;
    if (subscribers >= 1000) growthScore += 10;

    growthScore = Math.min(growthScore, 100);

    // Estimated RPM
    let rpm = 3.50;

    if (category === "Technology") rpm = 8.00;
    if (category === "Education") rpm = 6.00;
    if (category === "Howto & Style") rpm = 4.50;
    if (category === "Gaming") rpm = 2.50;

    // Estimated monthly revenue
    const estimatedMonthlyViews = Math.max(
      Math.round(views / 12),
      1
    );

    const monthlyRevenue = Math.round(
      (estimatedMonthlyViews / 1000) * rpm
    );

    const estimatedMonthlyRevenue =
      "$" + Math.max(monthlyRevenue, 1) + "+";

    // Return complete response
    return res.status(200).json({
      success: true,

      channel: {
        id: channel.id,
        title: channel.title,
        description: channel.description,
        thumbnail: channel.thumbnail,
        publishedAt: channel.publishedAt
      },

      statistics: {
        subscribers: channel.statistics?.subscribers || "0",
        views: channel.statistics?.views || "0",
        videos: channel.statistics?.videos || "0"
      },

      analysis: {
        niche,
        category,
        keywords: keywordList,
        rpm: rpm.toFixed(2),
        estimatedMonthlyRevenue,
        seoScore,
        growthScore,
        uploadTime: "Requires video-level data",
        engagement: "Requires video-level data"
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
}
