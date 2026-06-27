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

    const response = await fetch("/api/analyze?url=" + encodeURIComponent(url));
    const data = await response.json();

    loading.style.display = "none";

    if (!data.success) {
      alert(data.message);
      return;
    }

    document.getElementById("daily").innerText = "Estimated";
    document.getElementById("monthly").innerText = data.estimatedMonthlyRevenue;
    document.getElementById("yearly").innerText = "≈ Annual Estimate";
    document.getElementById("rpm").innerText = "$" + data.rpm;
    document.getElementById("niche").innerText = data.niche;
    document.getElementById("category").innerText = data.niche;
    document.getElementById("keywords").innerText = data.keywords.join(", ");
    document.getElementById("upload").innerText = data.uploadTime;
    document.getElementById("frequency").innerText = "Estimated";
    document.getElementById("engagement").innerText = "Estimated";
    document.getElementById("seo").innerText = data.seoScore + "/100";
    document.getElementById("growth").innerText = data.growthScore + "%";

  } catch (err) {

    loading.style.display = "none";
    alert("Something went wrong.");

  }

});
