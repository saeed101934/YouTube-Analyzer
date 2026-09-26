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

    if (url.includes("/channel/")) {
      channelId = url.split("/channel/")[1].split("/")[0];
    } 
    else if (url.includes("/@")) {
      const handle = url.split("/@")[1].split("/")[0];
      channelId = await searchChannel(handle);
    } 
    else {
      return res.status(400).json({
        success: false,
        message: "Unsupported YouTube URL."
      });
    }

    const channel = await getChannelById(channelId);

    const stats = channel.statistics;
    const snippet = channel.snippet;

    return res.status(200).json({
      success: true,

      channel: {
        id: channel.id,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails?.high?.url || "",
        publishedAt: snippet.publishedAt
      },

      statistics: {
        subscribers: stats.subscriberCount,
        views: stats.viewCount,
        videos: stats.videoCount
      }
    });

  } catch (error) {
    console.error("Analyze error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
}
