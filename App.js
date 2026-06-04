// Mengambil data Trending
async function loadTrending() {
    const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=4');
    const data = await res.json();
    renderList('trending-list', data.data);
}

// Mengambil data Acak
async function loadRandom() {
    const res = await fetch('https://api.jikan.moe/v4/random/anime');
    const data = await res.json();
    // Tambahkan logika render ke elemen random-list
}

// Halaman Detail
async function showDetail(id) {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    const data = await res.json();
    const anime = data.data;

    document.getElementById('content').innerHTML = `
        <div class="p-4">
            <img src="${anime.images.jpg.large_image_url}" class="w-64">
            <h1 class="text-3xl">${anime.title}</h1>
            <p>${anime.synopsis}</p>
            <div id="episode-list" class="mt-4 grid grid-cols-5 gap-2">
                </div>
        </div>
    `;

    // Generate tombol episode (simulasi karena Jikan API terbatas untuk link video)
    for(let i = 1; i <= anime.episodes; i++) {
        document.getElementById('episode-list').innerHTML += `
            <button onclick="watchEpisode(${id}, ${i})" class="bg-blue-600 p-2 rounded">${i}</button>
        `;
    }
}

// Halaman Tonton (Player)
function watchEpisode(id, ep) {
    document.getElementById('content').innerHTML = `
        <div class="p-4">
            <h2 class="text-xl mb-4">Sedang Menonton Episode ${ep}</h2>
            <div class="aspect-video bg-black w-full">
                <iframe src="LINK_EMBED_VIDEO_DISINI/${id}/${ep}" class="w-full h-full"></iframe>
            </div>
            <button onclick="location.reload()" class="mt-4 bg-red-600 p-2">Kembali</button>
        </div>
    `;
}
