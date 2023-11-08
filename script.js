// const { async } = require("postcss-js");

const url = "https://api.github.com/users/";

async function apiCall () {
    const res = await fetch("https://api.github.com/users/lovebabbar");
    const data = await res.json();
    console.log(data);
}

// Creating shorthand fucntion and assiging to variable for easy fetching the elements 
const get = (e) => document.querySelector(`${e}`);


const searchInput = get("#searchInput");
const searchButton = get(".btn");

searchButton.addEventListener("click" , () => {
    if(searchInput.value !== "") {
        getUserData(url + searchInput.value);
    }
});

searchInput.addEventListener("keydown", (e) => {

    if(e.key === "Enter") {
        if(searchInput.value !== "") {
        getUserData(url + searchInput.value);
     }
    }
}, false);

async function getUserData(gitUrl) {

    const response = await fetch(gitUrl);
    const data = await response.json();

    if(!data){
        throw data;
    }
    
        updateProfile(data);
    
}

const noResults = get("#noResults");
let dateSegment;

function updateProfile (data){
    noResults.style.scale = 0;

    if (data.message !== "Not Found") {
        const userImage = get("#userImage");
    const name = get(".userName");
    const userName = get("[data-userName]");
    const profileBio = get(".profile-bio");
    const date = get("#date");
    const repos = get("#repos");
    const followers = get("#followers");
    const following = get("#following");
    const location = get("#location");
    const websiteLink = get("#websiteLink");
    const twitter = get("#twitter");
    const company = get("#company");
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    
    userImage.src = `${data?.avatar_url}`;
    name.innerText = data?.name;
    userName.innerText = `@${data?.login}`;
    userName.href = data?.html_url;
    profileBio.innerText = (data?.bio === null)?"This Profile has no Bio":data?.bio;
    dateSegment = data?.created_at.split('T').shift().split('-');
    date.innerText = `Joined ${dateSegment[2]} ${month[dateSegment[1] - 1]} ${dateSegment[0]}`;
    repos.innerText = data?.public_repos;
    repos.href = data?.repos_url;
    followers.innerText = data?.followers;
    followers.href = data?.followers_url;
    following.innerText = data?.following;
    following.href = data?.following_url;

    function nullCheck(apiItem, domItem) {
        if(apiItem === "" || apiItem === null) {
            domItem.style.opacity = 0.5;
            domItem.previousElementSibling.style.opacity = 0.5;
            return false;
        }else{
            return true;
        }
    }

    location.innerText = nullCheck(data?.location,location)?data?.location:"Not available";

    company.innerText = nullCheck(data?.company,company)?data?.company:"Not available";

    websiteLink.innerText = nullCheck(data?.blog,websiteLink)?data?.blog:"Not available";
    websiteLink.href = nullCheck(data?.blog,websiteLink)?data?.blog:"#";

    twitter.innerText = nullCheck(data?.twitter_username,twitter)?data?.twitter_username:"Not available";
    twitter.href = nullCheck(data?.twitter_username,twitter)?`https://twitter.com/${data?.twitter_username}`:"#";
    }
    else{
        noResults.style.scale = 1;
        setTimeout(() => {
            noResults.style.scale = 0;
        }, 2500);
    }
}

getUserData(url + "lovebabbar");

// ------------------------Dark Mode----------------------
const modeButton = get(".dark-mode");
const modeText = get("[dark-text]");
const modeIcon = get("[darkIcon]");
const root = document.documentElement.style;
let darkMode = false;

modeButton.addEventListener("click", () => {
    if(darkMode === false) {
        enableDarkMode();
    }else{
        enableLightMode();
    }
});

function enableDarkMode() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    // root.setProperty("--lm-icon-bg", "brightness(100%)");
    modeText.innerText = "LIGHT";
    modeIcon.src = "./Images/sun-icon.svg";
    darkMode = true;
    localStorage.setItem("dark-mode", true);
}

function enableLightMode() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    // root.setProperty("--lm-icon-bg", "brightness(100%)");
    modeText.innerText = "DARK";
    modeIcon.src = "./Images/moon-icon.svg";
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}


// Check Browsers default value for dark and light mode
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// check if user already opted for any mode by buttons

if(localStorage.getItem("dark-mode") === null) {
    if(prefersDarkMode) {
        enableDarkMode();
    }else{
        enableLightMode;
    }
}else{
    if(localStorage.getItem("dark-mode") === true) {
        enableDarkMode();
    }else{
        enableLightMode();
    }
}