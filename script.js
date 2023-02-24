const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://iTunes.apple.com/search";

async function searchSongs(term) {
  const res = await fetch(`${apiURL}?term=${term}&media=music&limit=20`);
  const data = await res.json();

  showData(data);
}

function showData(data) {
  const songs = data.results;

  console.log(songs);

  let output = "";

  songs.forEach((song) => {
    output += `<li>
    <span><strong>${song.artistName}</strong><br>${song.trackName}</span> 
    <audio controls src="${song.previewUrl}"></audio>
    <button class="btn"
    data-artist="${song.artistName}"
    data-songtitle=" ${song.trackName}">$ ${song.trackPrice}</button>
    </li>`;
  });

  result.innerHTML = `
  <ul class="songs">
    ${output}
  </ul>`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
    console.log(searchTerm);
  }
  setTimeout(() => (search.value = ""), 1000);
});
