// Campus Connect — Evaluation I JavaScript
// Variables, arrays, objects, loops, ES6, DOM, events, Fetch API,
// JSON, localStorage and reusable functions.

let opportunities = [];
let announcements = [];
let currentFilter = "All";

const opportunityGrid = document.getElementById("opportunityGrid");
const announcementList = document.getElementById("announcementList");
const globalSearch = document.getElementById("globalSearch");
const topSearch = document.getElementById("topSearch");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

async function loadOpportunities() {
  try {
    const response = await fetch("opportunities.json");
    if (!response.ok) throw new Error("Opportunity data could not be loaded");
    opportunities = await response.json();
    renderOpportunities();
  } catch (error) {
    opportunities = [
      {type:"Internships",company:"Campus Labs",title:"Frontend Development Intern",location:"Remote",mode:"Work from home",tags:["HTML","CSS","JavaScript"],days:"5 days left"},
      {type:"Jobs",company:"TechBridge",title:"Junior Web Developer",location:"Chandigarh",mode:"Full time",tags:["JavaScript","UI"],days:"12 days left"},
      {type:"Competitions",company:"Campus Connect",title:"Innovation Challenge 2026",location:"Online",mode:"Team event",tags:["Ideas","Tech"],days:"18 days left"}
    ];
    renderOpportunities();
    console.log("Opportunity fetch fallback:", error.message);
  }
}

async function loadAnnouncements() {
  try {
    const response = await fetch("announcements.json");
    if (!response.ok) throw new Error("Announcement data could not be loaded");
    announcements = await response.json();
    renderAnnouncements();
  } catch (error) {
    announcements = [
      {category:"Academic",date:"05 Sep",title:"Mid-semester schedule released",description:"Check the updated academic schedule through the campus portal."},
      {category:"Events",date:"08 Sep",title:"Campus innovation showcase",description:"Student teams can register for the upcoming innovation showcase."},
      {category:"Notice",date:"10 Sep",title:"Library timing update",description:"The library will follow extended working hours during examinations."}
    ];
    renderAnnouncements();
    console.log("Announcement fetch fallback:", error.message);
  }
}

function renderAnnouncements() {
  announcementList.innerHTML = "";

  announcements.forEach(({category, date, title, description}) => {
    const item = document.createElement("article");
    item.className = "announcement-item";
    item.innerHTML = `
      <div class="announcement-date">${date}</div>
      <div>
        <span class="announcement-category">${category}</span>
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
    `;
    announcementList.appendChild(item);
  });
}

const renderOpportunities = () => {
  const keyword = globalSearch.value.toLowerCase().trim();

  const filtered = opportunities.filter((item) => {
    const matchesType = currentFilter === "All" || item.type === currentFilter;
    const text = `${item.title} ${item.company} ${item.location} ${item.tags.join(" ")}`.toLowerCase();
    return matchesType && text.includes(keyword);
  });

  opportunityGrid.innerHTML = "";

  if (!filtered.length) {
    opportunityGrid.innerHTML = "<p class='loading'>No opportunities found. Try another search.</p>";
    return;
  }

  filtered.forEach(({type, company, title, location, mode, tags, days}) => {
    const card = document.createElement("article");
    card.className = "opportunity-card";
    card.innerHTML = `
      <div class="card-company">
        <div class="company-logo">${company.slice(0,2).toUpperCase()}</div>
        <div><strong>${company}</strong><small>${type}</small></div>
      </div>
      <h3>${title}</h3>
      <p>${location} &nbsp; • &nbsp; ${mode}</p>
      <div class="tags">${tags.map(tag => `<span>${tag}</span>`).join("")}</div>
      <div class="card-bottom">
        <small>${days}</small>
        <button class="apply-btn" data-title="${title}">View details</button>
      </div>
    `;
    opportunityGrid.appendChild(card);
  });
};

topSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  currentFilter = "All";
  document.querySelectorAll(".filter").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === "All"));
  renderOpportunities();
  document.getElementById("opportunities").scrollIntoView({behavior:"smooth"});
});

globalSearch.addEventListener("input", renderOpportunities);

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    currentFilter = filter;

    if (button.classList.contains("filter")) {
      document.querySelectorAll(".filter").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    } else {
      document.querySelectorAll(".filter").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === filter));
    }

    renderOpportunities();
    document.getElementById("opportunities").scrollIntoView({behavior:"smooth"});
  });
});

opportunityGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".apply-btn");
  if (button) showToast(`${button.dataset.title}: details module will be expanded in Evaluation-II.`);
});

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const action = actionButton.dataset.action;
  if (action === "service") showToast(`${actionButton.dataset.service} will be developed further in the next evaluation.`);
  if (action === "post") showToast("Posting is a planned future module. For Evaluation-I this is a UI interaction.");
  if (action === "mentor") showToast("Mentorship module is planned for the next evaluation.");
});

const contactForm = document.getElementById("contactForm");
const savedUser = document.getElementById("savedUser");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const student = {
    name: data.get("name"),
    email: data.get("email"),
    message: data.get("message")
  };

  localStorage.setItem("campusConnectStudent", JSON.stringify(student));
  formMessage.textContent = `Thanks ${student.name}! Your request was saved locally.`;
  contactForm.reset();
  showSavedUser();
});

function showSavedUser() {
  const stored = localStorage.getItem("campusConnectStudent");

  if (!stored) {
    savedUser.hidden = true;
    return;
  }

  const student = JSON.parse(stored);
  savedUser.textContent = `Welcome back, ${student.name}. Your previous request is stored in this browser.`;
  savedUser.hidden = false;
}

const searchToggle = document.getElementById("searchToggle");
searchToggle.addEventListener("click", () => {
  topSearch.classList.toggle("mobile-show");
  if (topSearch.classList.contains("mobile-show")) globalSearch.focus();
});

const projectInfo = {name: "Campus Connect", version: "Evaluation-I"};
const {name: projectName, version} = projectInfo;
console.log(`${projectName} — ${version}`);

const coreSections = ["Internships", "Jobs"];
const allSections = [...coreSections, "Competitions", "Mentorship"];
console.log("Sections:", allSections);

loadOpportunities();
loadAnnouncements();
showSavedUser();
