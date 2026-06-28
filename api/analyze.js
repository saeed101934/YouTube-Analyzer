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
