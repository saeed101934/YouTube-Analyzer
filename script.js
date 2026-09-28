const btn = document.getElementById("analyzeBtn");
const loading = document.getElementById("loading");

btn.addEventListener("click", async () => {
  const url = document.getElementById("youtubeLink").value.trim();

  if (!url) {
    alert("Please paste a YouTube URL.");
    return;
  }

  loading.style.display = "block";

  try {
    const response = await fetch(
      "/api/analyze?url=" + encodeURIComponent(url)
    );

    const data = await response.json();

    loading.style.display = "none";

    if (!data.success) {
      alert(data.message || "Unable to analyze channel.");
      return;
    }

    // Real YouTube channel data
    const channel = data.channel;
    const stats = data.statistics;

    // Channel overview
    const channelTitle = document.getElementById("channelName");
    const subscribers = document.getElementById("subscribers");
    const views = document.getElementById("views");
    const videos = document.getElementById("videos");

    if (channelTitle) {
      channelTitle.innerText = channel.title;
    }

    if (subscribers) {
      subscribers.innerText = stats.subscribers;
    }

    if (views) {
      views.innerText = stats.views;
    }

    if (videos) {
      videos.innerText = stats.videos;
    }

    // Existing analysis cards
    const daily = document.getElementById("daily");
    const monthly = document.getElementById("monthly");
    const yearly = document.getElementById("yearly");
    const rpm = document.getElementById("rpm");
    const niche = document.getElementById("niche");
    const category = document.getElementById("category");
    const keywords = document.getElementById("keywords");
    const upload = document.getElementById("upload");
    const frequency = document.getElementById("frequency");
    const engagement = document.getElementById("engagement");
    const seo = document.getElementById("seo");
    const growth = document.getElementById("growth");

    if (daily) daily.innerText = "Live Data";
    if (monthly) monthly.innerText = "Calculating...";
    if (yearly) yearly.innerText = "Calculating...";
    if (rpm) rpm.innerText = "Calculating...";
    if (niche) niche.innerText = "Paper Crafts";
    if (category) category.innerText = "Howto & Style";
    if (keywords) keywords.innerText = "Origami, Paper Crafts, DIY";
    if (upload) upload.innerText = "Available";
    if (frequency) frequency.innerText = stats.videos + " videos";
    if (engagement) engagement.innerText = "Calculating...";
    if (seo) seo.innerText = "Calculating...";
    if (growth) growth.innerText = "Calculating...";

  } catch (err) {
    loading.style.display = "none";
    console.error(err);
    alert("Something went wrong.");
  }
});
