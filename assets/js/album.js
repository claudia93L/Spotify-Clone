let globalTracks = [];

function urlGeneratorAlbum(id) {
  return urlAlbum + id;
}

const getRecord = (id) => {
  fetch(urlGeneratorAlbum(id), {
    headers: {
      authorization: token,
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      albums.push(data);
      // tracks.push(data.tracks);

      createAlbumSection(data);
      console.log(data.tracks.data);

      createTable(data.tracks.data, data);
      globalTracks = data.tracks.data;
    });
};

function createAlbumSection(data) {
  //RECUPERO ANNO ALBUM
  let date = data.release_date;
  //let year = date.split('-')[0];
  let year = date.slice(0, 4);

  // RECUPERO DURATA ALBUM
  convertTime(data);

  const containerTrack = document.querySelector('#container-track2');
  containerTrack.innerHTML = `
  <div style="z-index:0; position:relative; top:0" class="w-100"><img src="${
    data.cover_xl
  }" class="w-100" style="filter: blur(100px); -webkit-filter: blur(100px); height:400px">
  <div class="card mb-3 mt-5 border-0 bg-transparent text-white container" style="max-width: 1000px; position:absolute; top:0">

<div class="row g-0">
  <div class="col-md-4">
    <img src="${data.cover_medium}" class="img-fluid rounded-start" alt="${
    data.title
  }">
  </div>
  <div class="col-md-8">
   <div class="row">
    <div class="card-body  mt-5">
      <h1 class="card-title">${data.title}</h1>
      <h4 id="artist-name"><a href="artist.html?id=${data.artist.id}">${
    data.artist.name
  }</a></h4>
      <div class="container   mt-5 align-items-center "><div class=" row d-flex align-items-center"><img class="rounded-circle col-1" src="${
        data.artist.picture
      } ">
      <div class="col-11 mt-3">
      <span class=""><a href="artist.html?id=${data.artist.id}">${
    data.artist.name
  }</a></span>
      <span class="">- ${year}</span>
      <span class="">-${data.nb_tracks} brani,</span>
      <span class="text-white">${min + ' min. ' + sec + ' sec.'}</span>
      </div>
      </div>
      </div>
      <p class="card-text"><small class="text-body-white">Last updated 3 mins ago</small></p>
    </div>
   <div/>
  </div>
</div>
</div>
</div>

    `;
}

// Funzione conversione durata album

function convertTime(data) {
  let songDuration = data.duration;
  min = Math.floor(songDuration / 60);
  sec = Math.floor(songDuration % 60);
}

// Funzione conversione durata singola canzone

function convertTimeAlbums(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

//FUNZIONE POPOLA LISTA PAGINA ALBUM

function createTable(tracks, album) {
  const tBody = document.querySelector('#bodyTable');
  let tableHTML = '';
  tracks.forEach((track, index) => {
    tableHTML += `
  <tr>
  <div id="margine">
    <th scope="row" class="bg-transparent">${index + 1}</th>
    <td >
    
        <a href="#"><p class="mb-0" id="tracciaArtista" onclick="createFooter(${index})">${
      track.title
    }</p></a>
        <p class="mb-0"><a href="artist.html?id=${track.artist.id}">${
      track.artist.name
    }</a></p>
    </div>
    </td>

    <td>${track.rank}</td>
  
    <td >${convertTimeAlbums(track.duration)}</td>
   
  </tr>

  `;
  });
  tBody.innerHTML = tableHTML;
}

function createFooter(trackIndex) {
  const footerSong = document.getElementById('footer-album');
  footerSong.innerHTML = `<div class="col-md-2 d-flex align-items-center">
<img
  src="${globalTracks[trackIndex].album.cover}"
  class="img-fluid rounded-start"
  alt="${globalTracks[trackIndex].album.title} cover"
/>
</div>
<div class="col-md-8">
<div class="card-body">
  <h5 class="card-title">${globalTracks[trackIndex].title}</h5>
  <p class="card-text">
    ${globalTracks[trackIndex].artist.name}
  </p>
</div>
</div>`;
  createHeart(footerSong);
}

function createHeart(footerSong) {
  const heartSection = document.querySelector('.heart-section');
  if (footerSong.innerHTML !== '') {
    heartSection.innerHTML = `<svg
xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=""
class="bi bi-heart-fill cuore" viewBox="0 0 16 16">
<path fill-rule="evenodd"
    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
</svg>`;
    heartEventListener();
  }
}

window.onload = () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  getRecord(id);

  if (!id) {
    window.location.href = 'index.html';
  }

  heartEventListener();
};
