const API_KEY = process.env.YOUTUBE_API_KEY;

export async function getChannelById(channelId) {
  const url =
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch channel data");
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("Channel not found");
  }

  return data.items[0];
}
