const urlSearch = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MjkyNGMwNTgzNTAwMTg1MjJkMGIiLCJpYXQiOjE3MDIzNzM2NjgsImV4cCI6MTcwMzU4MzI2OH0.3UPGwlcKf8Ag5wW0fA_00qA6c7XcRvZQrqN5iPJRhSY';

let searchArray = [];
function getSearch() {
  let ricerca = document.getElementById('ricerca').value;
  fetch(urlSearch + ricerca, {
    headers: {
      authorization: token,
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      searchArray.push(data.data);
      console.log(searchArray);
      populateAreaSearch(data.data);
    });
}

function populateAreaSearch(searchArray) {
  const newRow = document.createElement('div');
  const populateSearch = document.getElementById('searchArea');
  newRow.classList.add('row');
  populateSearch.innerHTML = '';
  populateSearch.appendChild(newRow);
  searchArray.forEach((el) => {
    newRow.innerHTML += `
    <div class="col-2 mx-2 my-3 card-search">
    <div class="card bg-dark" style="width: 16rem; height:330px">
    <a href="album.html?id=${el.album.id}"><img src="${el.album.cover_big}" class="card-img-top" alt="${el.album.title}"></a>
    <div class="card-body">
      <h5 class="card-title text-white h5-search">${el.title}</h5>
      <p class="card-text p-search"><a href="artist.html?id=${el.album.id}">${el.album.title}</a></p>
      <div class="d-flex align-items-center">
      <img class="rounded-circle me-2" width="15%" src="${el.artist.picture_small} ">
      <p class="card-text p-search"><a href="artist.html?id=${el.artist.id}">${el.artist.name}</a></p>
      </div>
    </div>
  </div>
  </div>
    `;
  });
}
