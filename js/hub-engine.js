// js/hub-engine.js - Silnik obsługi bazy i logiki wyszukiwania

const DATABASE_API_URL = "https://script.google.com/macros/s/AKfycbxHhEiT7YPjUtG6XYq8n4HGew8INj6osdogMd5YxQb6iwKv3iVuzOYaAWDEHS4uvCFS/exec";

const COMPLETE_SUBJECTS_LIST = [
    "Arts", "Biology", "Business", "Chemistry", "Chinese", 
    "Computers and Technology", "Engineering", "English", "Exam", "French", 
    "Geography", "German", "Health", "Hindi", "History", 
    "India Languages", "Italian", "Law", "Mathematics", "Music", 
    "Nature", "Other Languages", "Physics", "Polish", "Psychology", 
    "Religion", "Russian", "Safety Education", "Social Studies", "Spanish"
];

let fullDatabase = [];

function fetchDatabaseJSONP() {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_db_' + Math.round(100000 * Math.random());
        const script = document.createElement('script');

        window[callbackName] = function(data) {
            delete window[callbackName];
            document.body.removeChild(script);
            resolve(data);
        };

        script.onerror = function() {
            delete window[callbackName];
            document.body.removeChild(script);
            reject(new Error('JSONP Database fetch failed'));
        };

        script.src = `${DATABASE_API_URL}?callback=${callbackName}`;
        document.body.appendChild(script);
    });
}

function initCachedData() {
    try {
        const cachedRaw = localStorage.getItem("brainly_db_cache");
        if (cachedRaw) {
            const parsed = JSON.parse(cachedRaw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                fullDatabase = parsed;
                updateEngineMetrics(fullDatabase);
                renderFeaturedThree();
            }
        }
    } catch(e) {
        console.warn("Cache read failed", e);
    }
}

async function loadDatabase() {
    try {
        const response = await fetchDatabaseJSONP();
        if (response && response.success && Array.isArray(response.data)) {
            fullDatabase = response.data;
            try { localStorage.setItem("brainly_db_cache", JSON.stringify(fullDatabase)); } catch(e){}
            
            updateEngineMetrics(fullDatabase);
            renderFeaturedThree();

            const searchInput = document.getElementById("ai-search-input");
            const filterMarket = document.getElementById("filter-market");
            const filterLevel = document.getElementById("filter-level");
            const filterSubject = document.getElementById("filter-subject");
            
            if (searchInput.value.trim().length > 0 || filterMarket.value || filterLevel.value || filterSubject.value) {
                filterData();
            }
        }
    } catch (err) {
        console.error("Database error:", err);
    }
}

function populateAllStaticFilterDropdowns() {
    const filterMarket = document.getElementById("filter-market");
    const filterLevel = document.getElementById("filter-level");
    const filterSubject = document.getElementById("filter-subject");

    filterMarket.innerHTML = '<option value="">All Markets</option>';
    filterLevel.innerHTML = '<option value="">All Levels</option>';
    filterSubject.innerHTML = '<option value="">All Subjects</option>';

    if (typeof MARKET_MAP !== 'undefined') {
        Object.keys(MARKET_MAP).sort().forEach(mKey => {
            const opt = document.createElement("option");
            opt.value = mKey;
            opt.textContent = MARKET_MAP[mKey];
            filterMarket.appendChild(opt);
        });
    }

    if (typeof LEVEL_MAP !== 'undefined') {
        Object.keys(LEVEL_MAP).forEach(lKey => {
            const opt = document.createElement("option");
            opt.value = lKey;
            opt.textContent = LEVEL_MAP[lKey];
            filterLevel.appendChild(opt);
        });
    }

    COMPLETE_SUBJECTS_LIST.sort((a, b) => a.localeCompare(b)).forEach(s => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        filterSubject.appendChild(opt);
    });
}

function updateEngineMetrics(data) {
    const statPackages = document.getElementById("stat-packages-count");
    const statLinks = document.getElementById("stat-links-count");
    const statMarkets = document.getElementById("stat-markets-count");
    const statSubjects = document.getElementById("stat-subjects-count");
    const statLevels = document.getElementById("stat-levels-count");

    const grouped = typeof groupDatabaseIntoPackages === 'function' ? groupDatabaseIntoPackages(data) : [];
    const totalLinks = data.filter(i => i.link && String(i.link).trim().length > 0).length;

    if (statPackages) statPackages.textContent = grouped.length;
    if (statLinks) statLinks.textContent = totalLinks;
    if (statMarkets) statMarkets.textContent = typeof MARKET_MAP !== 'undefined' ? Object.keys(MARKET_MAP).length : 11;
    if (statSubjects) statSubjects.textContent = COMPLETE_SUBJECTS_LIST.length;
    if (statLevels) statLevels.textContent = typeof LEVEL_MAP !== 'undefined' ? Object.keys(LEVEL_MAP).length : 5;
}

// Renderowanie dokładnie 3 najnowszych paczek przed wpisaniem zapytania
function renderFeaturedThree() {
    const featuredContainer = document.getElementById("featured-packages-grid");
    if (!featuredContainer || fullDatabase.length === 0) return;

    const grouped = typeof groupDatabaseIntoPackages === 'function' ? groupDatabaseIntoPackages(fullDatabase) : [];
    const latestThree = grouped.slice(0, 3);

    if (typeof renderPackagesGrid === 'function') {
        renderPackagesGrid(featuredContainer, null, latestThree, false, true);
    }
}

function handleSubjectChange() {
    const filterSubject = document.getElementById("filter-subject");
    const filterLevel = document.getElementById("filter-level");
    const isExam = filterSubject.value.trim().toLowerCase() === "exam";

    if (isExam) {
        filterLevel.value = "EXAM";
    } else if (filterLevel.value === "EXAM") {
        filterLevel.value = "";
    }

    filterData();
}

function handleLevelChange() {
    const filterSubject = document.getElementById("filter-subject");
    const filterLevel = document.getElementById("filter-level");
    const isExamLevel = filterLevel.value.trim().toUpperCase() === "EXAM";

    if (isExamLevel) {
        filterSubject.value = "Exam";
    } else if (filterSubject.value.toLowerCase() === "exam") {
        filterSubject.value = "";
    }

    filterData();
}

function handleInputQuery() {
    const searchInput = document.getElementById("ai-search-input");
    const filterSubject = document.getElementById("filter-subject");
    const query = searchInput.value.trim().toLowerCase();

    if (query.includes("trygonometria") || query.includes("trigonometr") || query.includes("algebra") || query.includes("geometry")) {
        if (filterSubject.value !== "Exam") {
            filterSubject.value = "Mathematics";
        }
    }

    filterData();
}

function filterData() {
    const searchInput = document.getElementById("ai-search-input");
    const clearSearchBtn = document.getElementById("clear-search-btn");
    const filterMarket = document.getElementById("filter-market");
    const filterLevel = document.getElementById("filter-level");
    const filterSubject = document.getElementById("filter-subject");

    const initialPlaceholder = document.getElementById("initial-placeholder");
    const resultsSection = document.getElementById("results-section");
    const packagesContainer = document.getElementById("packages-container");
    const resultsCountText = document.getElementById("results-count-text");

    const query = searchInput.value.trim().toLowerCase();
    const selectedMarket = filterMarket.value.trim().toUpperCase();
    const selectedLevel = filterLevel.value.trim().toUpperCase();
    const selectedSubject = filterSubject.value.trim();

    const isFilterActive = query.length > 0 || selectedMarket !== "" || selectedLevel !== "" || selectedSubject !== "";

    clearSearchBtn.style.display = query.length > 0 ? "flex" : "none";

    if (!isFilterActive) {
        initialPlaceholder.style.display = "block";
        resultsSection.style.display = "none";
        return;
    }

    initialPlaceholder.style.display = "none";
    resultsSection.style.display = "block";

    const filteredRawRows = fullDatabase.filter(item => {
        const topic = String(item.topic || "").toLowerCase();
        const market = String(item.market || "").toUpperCase();
        const level = String(item.level || "").toUpperCase();
        const subject = String(item.subject || "");

        const matchesQuery = !query || topic.includes(query) || subject.toLowerCase().includes(query);
        const matchesMarket = !selectedMarket || market === selectedMarket;
        const matchesSubject = !selectedSubject || subject.toLowerCase() === selectedSubject.toLowerCase();
        const matchesLevel = !selectedLevel || level === selectedLevel;

        return matchesQuery && matchesMarket && matchesLevel && matchesSubject;
    });

    const groupedPackages = typeof groupDatabaseIntoPackages === 'function' ? groupDatabaseIntoPackages(filteredRawRows) : [];
    if (typeof renderPackagesGrid === 'function') {
        renderPackagesGrid(packagesContainer, resultsCountText, groupedPackages, isFilterActive, false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateAllStaticFilterDropdowns();

    const searchInput = document.getElementById("ai-search-input");
    const clearSearchBtn = document.getElementById("clear-search-btn");
    const filterMarket = document.getElementById("filter-market");
    const filterLevel = document.getElementById("filter-level");
    const filterSubject = document.getElementById("filter-subject");
    const logoutBtn = document.getElementById("hub-logout-btn");
    const usernameDisplay = document.getElementById("hub-username-display");

    const sessionUser = sessionStorage.getItem("brainly_hub_user");
    if (usernameDisplay) usernameDisplay.textContent = sessionUser || "User";

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("brainly_hub_user");
            window.location.replace("hub.html");
        });
    }

    if (searchInput) searchInput.addEventListener("input", handleInputQuery);
    if (filterMarket) filterMarket.addEventListener("change", filterData);
    if (filterLevel) filterLevel.addEventListener("change", handleLevelChange);
    if (filterSubject) filterSubject.addEventListener("change", handleSubjectChange);

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
            searchInput.value = "";
            filterSubject.value = "";
            filterLevel.value = "";
            filterData();
            searchInput.focus();
        });
    }

    initCachedData();
    loadDatabase();
});
