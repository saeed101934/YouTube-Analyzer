const btn = document.getElementById("analyzeBtn");
const loading = document.getElementById("loading");

btn.addEventListener("click", () => {

const url = document.getElementById("youtubeLink").value.trim();

if(url===""){
alert("Please paste a YouTube Channel or Video URL.");
return;
}

loading.style.display="block";

setTimeout(()=>{

loading.style.display="none";

document.getElementById("daily").innerText="$25 - $180";

document.getElementById("monthly").innerText="$750 - $5,400";

document.getElementById("yearly").innerText="$9K - $64K";

document.getElementById("rpm").innerText="$3.75";

document.getElementById("niche").innerText="Psychology";

document.getElementById("category").innerText="Education";

document.getElementById("keywords").innerText="Psychology, Human Behavior, Facts";

document.getElementById("upload").innerText="7:00 PM - 9:00 PM";

document.getElementById("frequency").innerText="4 Videos / Week";

document.getElementById("engagement").innerText="8.4%";

document.getElementById("seo").innerText="92 / 100";

document.getElementById("growth").innerText="87%";

},2000);

});
