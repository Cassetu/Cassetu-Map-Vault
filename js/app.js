document.addEventListener("DOMContentLoaded", () => {
    const searchToggle = document.getElementById("searchToggle");
    const searchDashboard = document.getElementById("searchDashboard");
    const mapGrid = document.getElementById("mapGrid");

    const mapSearch = document.getElementById("mapSearch");
    const versionFilter = document.getElementById("versionFilter");
    const modeFilter = document.getElementById("modeFilter");

    searchToggle.addEventListener("click", () => {
        searchDashboard.classList.toggle("open");
        searchToggle.classList.toggle("active");
    });

    function renderMaps(maps) {
        mapGrid.innerHTML = "";

        maps.forEach(map => {
            const card = document.createElement("div");
            card.className = "map-card";

            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${map.images[0]}" alt="${map.title}" class="card-image">
                </div>
                <div class="card-info">
                    <h3 class="card-title">${map.title}</h3>
                    <p class="card-description">${map.description}</p>
                    <div class="card-meta">
                        <span class="meta-version">${map.version}</span>
                        <span class="meta-mode">${map.mode}</span>
                    </div>
                    <div class="card-tags">
                        ${map.tags.map(tag => {
                            const iconUrl = window.TAG_ICONS && window.TAG_ICONS[tag];
                            const iconImg = iconUrl ? `<img src="${iconUrl}" alt="" class="tag-icon">` : "";
                            return `<span class="card-tag">${iconImg}${tag}</span>`;
                        }).join("")}
                    </div>
                    <a href="${map.downloadUrl}" class="card-download-btn" data-id="${map.id}">
                        <img src="assets/icons/download.svg" alt="" class="download-icon">
                        <span>Download</span>
                    </a>
                </div>
            `;

            mapGrid.appendChild(card);
        });
    }

    mapGrid.addEventListener("click", (e) => {
        const btn = e.target.closest(".card-download-btn");
        if (!btn) return;

        btn.classList.add("downloaded");
        btn.innerHTML = `
            <img src="assets/icons/check.svg" alt="" class="download-icon">
            <span>Downloaded</span>
        `;
    });

    function filterMaps() {
        if (!window.MAPS_DATABASE) return;

        const searchText = mapSearch.value.toLowerCase();
        const selectedVersion = versionFilter.value;
        const selectedMode = modeFilter.value;

        const filtered = window.MAPS_DATABASE.filter(map => {
            const matchesSearch = map.title.toLowerCase().includes(searchText) ||
                                  map.description.toLowerCase().includes(searchText);

            const matchesVersion = selectedVersion === "all" || map.version === selectedVersion;

            const matchesMode = selectedMode === "all" || map.mode === selectedMode;

            return matchesSearch && matchesVersion && matchesMode;
        });

        renderMaps(filtered);
    }

    mapSearch.addEventListener("input", filterMaps);
    versionFilter.addEventListener("change", filterMaps);
    modeFilter.addEventListener("change", filterMaps);

    if (window.MAPS_DATABASE) {
        renderMaps(window.MAPS_DATABASE);
    }
});