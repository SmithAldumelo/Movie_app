const apiURL = "https:api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const imgPath = "https://image.tmdb.org/t/p/w1280"
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// get fav movies by popularity
getMovies(apiURL);
async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.results)

}

function showMovies(movies){
    // clear main
    main.innerHTML = ""

     movies.forEach(movie =>{
        const {poster_path, title, vote_average,overview} = movie;

        const movieEL = document.createElement("div");
        movieEL.classList.add("movie");
        movieEL.innerHTML = `
            <img src="${imgPath + poster_path}"
             alt="">
             <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClsssByRate(vote_average)}">${vote_average}</span>
             </div>
             <div class="overview">
             <h4>overview</h4>
                 ${overview}

             </div>
        `
        main.appendChild(movieEL)
    })

}


function getClsssByRate(vote){
    if(vote>=8){
       return "green"; 
    }else if (vote >= 5){
        return "orange"
    } else{
        return "red"
    }
}

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        search.value = ""
    }

})
