const urlSearch = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
const urlAlbum = 'https://striveschool-api.herokuapp.com/api/deezer/album/';
const urlArtist = 'https://striveschool-api.herokuapp.com/api/deezer/artist/';
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MjkyNGMwNTgzNTAwMTg1MjJkMGIiLCJpYXQiOjE3MDIzNzM2NjgsImV4cCI6MTcwMzU4MzI2OH0.3UPGwlcKf8Ag5wW0fA_00qA6c7XcRvZQrqN5iPJRhSY';

let nomeArtista;
let albumsId = [725251, 75621062, 504425001, 116581812, 494082601, 42133801];
let artistsId = [
  412, 7892860, 459578, 54587122, 151295012, 75798, 93, 5603958, 10520799,
  5603958, 6511779, 412,
];
let albums = [];
let artists = [];

const headers = {
  Authorization: token,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
function urlGeneratorArtists(id) {
  return urlArtist + id;
}

//FUNZIONE PER RECUPERARE ARTISTI
const getArtists = () => {
  artistsId.forEach((id) => {
    fetch(urlGeneratorArtists(id), {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        artists = data;
        createArtists(data);
      });
  });
};

function createArtists(artists) {
  const rigartists = document.querySelector('#card-section-2');
  rigartists.innerHTML += `<a href="artist.html?id=${artists.id}" class="card bg-dark text-white rounded-4 pt-3" style="width: 18rem;">
        <img src="${artists.picture_big}" class="card-img-top" alt="card image">
        <div class="card-body">
          <h5 class="card-title">${artists.name}</h5>
          <p class="card-text">${artists.type}</p>
        </div>
      </a>`;
}

//FUNZIONE PER RECUPERARE ALBUMS
const getAlbums = () => {
  albumsId.forEach((id) => {
    fetch(urlGeneratorAlbums(id), {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        albums.push(data);
        console.log(albums);
        createAlbums(data);
        createTrackSection();
        createFooter();
      });
  });
};

//USA LA FUNZIONE createAlbums PER GENERARE LE CARDS
function createAlbums(albums) {
  const rigalbum = document.querySelector('#card-section-1');
  rigalbum.innerHTML += `<a href="album.html?id=${albums.id}" class="card mb-3 bg-dark text-white rounded-3 ps-0 pb-0" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${albums.cover_big}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${albums.title}</h5>
                </div>
              </div>
            </div>
          </div>
        </a>`;
}

//create track generator
function createTrackSection() {
  const randomAlbumIndex = Math.floor(Math.random() * albums.length);
  const randomAlbum = albums[randomAlbumIndex];
  const containerTrack = document.getElementById('container-track');
  containerTrack.innerHTML = `<img class="w-25 me-4" src="${randomAlbum.cover_medium}" alt="${randomAlbum.title}" />
  <div class="track-infos text-white">
      <div class="row-alignment d-flex flex-row justify-content-between">
          <h6>ALBUM</h6>
          <div class="hide-ads px-3 py-1 rounded-5 align-self-end">
              NASCONDI ANNUNCI
          </div>
      </div>
      <h1 id="song-title" class="display-1">${randomAlbum.tracks.data[0].title}</h1>
      <h6 id="artist-name"><a href="artist.html?id=${randomAlbum.artist.id}">${randomAlbum.artist.name}</a></h6>
      <p>
      Sta canzone è bella fidati
      </p>
      <div class="row-alignment button-section">
          <button class="btn btn-success me-2 py-3 rounded-5 px-5 border-none" style="background-color:#1BD760; color:black" type="button">
              Play
          </button>
          <button class="btn btn-outline-light me-2 py-3 rounded-5 px-5" type="button">
              Salva
          </button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"
              class="bi bi-three-dots" viewBox="0 0 16 16">
              <path
                  d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
          </svg>
      </div>
  </div>`;
}

function urlGeneratorAlbums(id) {
  return urlAlbum + id;
}

function createFooter() {
  const randomAlbumIndex = Math.floor(Math.random() * albums.length);
  const randomAlbum = albums[randomAlbumIndex];
  const randomTrackIndex = Math.floor(
    Math.random() * randomAlbum.tracks.data.length
  );

  const footerSong = document.getElementById('footer-song');
  footerSong.innerHTML = `<div class="col-md-2 d-flex align-items-center">
<img
  src="${randomAlbum.cover}"
  class="img-fluid rounded-start"
  alt="${randomAlbum.title} cover"
/>
</div>
<div class="col-md-8">
<div class="card-body">
  <h5 class="card-title">${randomAlbum.tracks.data[randomTrackIndex].title}</h5>
  <p class="card-text">
    ${randomAlbum.artist.name}
  </p>
</div>
</div>`;
}

function heartEventListener() {
  const cuoreIcon = document.querySelector('.cuore');

  cuoreIcon.onclick = () => {
    const currentColor = cuoreIcon.getAttribute('fill');
    const newColor = currentColor === 'green' ? '' : 'green';

    cuoreIcon.setAttribute('fill', newColor);
  };
}

function updateVolume(value) {
  const volumeFill = document.querySelector('.volume-fill');
  volumeFill.style.width = value + '%';
}
function updatePlay(value) {
  const playFill = document.querySelector('.play-fill');
  playFill.style.width = value + '%';
}

window.onload = () => {
  getAlbums();
  getArtists();
  heartEventListener();
};
