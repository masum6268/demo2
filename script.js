const movieList = document.getElementById("movie-list");
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const sortAscButton = document.getElementById("sort-asc");
const sortDescButton = document.getElementById("sort-desc");
const sortCriteriaSelect = document.getElementById('sort-criteria');

let currentSearchResults = [];

searchButton.addEventListener("click", () => {
  const input = searchBar.value;
  datafetching(input);
});

sortAscButton.addEventListener("click", () => {
  const criteria = sortCriteriaSelect.value;
  sortResults(criteria, 'asc');
});

sortDescButton.addEventListener("click", () => {
  const criteria = sortCriteriaSelect.value;
  sortResults(criteria, 'desc');
});

const sortResults = (criteria, direction) => {
  const sortedResults = currentSearchResults.sort((a, b) => {
    let aValue = a[criteria];
    let bValue = b[criteria];

    // Handle sorting by title (name)
    if (criteria === 'name') {
      aValue = a.title.toLowerCase();
      bValue = b.title.toLowerCase();
    }

    if (direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  displayResults(sortedResults);
};

const displayResults = (results) => {
  movieList.innerHTML = "";

  if (results.length === 0) {
    movieList.innerHTML = "<p>No movies found</p>";
    return;
  }

  results.forEach((item) => {
    const movieItem = document.createElement("div");
    movieItem.className = "movie-item";
    movieItem.innerHTML = `
      <h2>${item.title}</h2>
      <p>Year: ${item.year}</p>
      <p>Rank: ${item.rank}</p>
      <p>Rating: ${item.rating}</p>
      <p>${item.description}</p>
      <img src="${item.image}" alt="${item.title} poster" />
    `;
    movieList.appendChild(movieItem);
  });
};

const datafetching = async (input) => {
  const url = "https://imdb-top-100-movies.p.rapidapi.com/";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "af6b1e24ccmshd7d96952539c251p1b95d0jsn06f24a26ba4d",
      "x-rapidapi-host": "imdb-top-100-movies.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    currentSearchResults = result.filter(item =>
      item.title.toLowerCase().includes(input.toLowerCase())
    );

    displayResults(currentSearchResults);
  } catch (error) {
    console.error(error);
    movieList.innerHTML = "<p>Error fetching data</p>";
  }
};
