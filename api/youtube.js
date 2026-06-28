const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function getChannelById(channelId) {
  const response = await fetch(
    `${BASE_URL}/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("YouTube API request failed.");
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("Channel not found.");
  }

  return data.items[0];
}

export async function searchChannel(query) {
  const response = await fetch(
    `${BASE_URL}/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&maxResults=1&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Search request failed.");
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("No channel found.");
  }

  return data.items[0].snippet.channelId;
}
