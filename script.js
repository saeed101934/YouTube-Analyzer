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
    const analysis = data.analysis;

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
if (monthly) monthly.innerText = analysis.estimatedMonthlyRevenue;
if (yearly) yearly.innerText = analysis.estimatedMonthlyRevenue;
if (rpm) rpm.innerText = "$" + analysis.rpm;
  if (niche) niche.innerText = analysis.niche;
if (category) category.innerText = analysis.category;
    if (keywords) keywords.innerText = analysis.keywords.join(", ");
    if (upload) upload.innerText = analysis.uploadTime;
if (frequency) frequency.innerText = stats.videos + " videos";
if (engagement) engagement.innerText = analysis.engagement;
if (seo) seo.innerText = analysis.seoScore + "/100";
if (growth) growth.innerText = analysis.growthScore + "/100";

  } catch (err) {
    loading.style.display = "none";
    console.error(err);
    alert("Something went wrong.");
  }
});
