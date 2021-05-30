// API key
const API_key = 'ea5cd35b72ddaaeb23a64fe8f407038e'

// <------------------------------------------> //

const createElement = el => {
    return document.createElement(el)
}

HTMLElement.prototype.addClass = function (className) {
    if (Array.isArray(className)) {
        this.forEach(c => this.classList.add(c))
        return this
    }

    this.classList.add(className)
    return this
}

// DOM selection
const search = document.querySelector('#search-form')
const showcase = document.querySelector('.showcase')

// creating movie container elements
const movieTemplate = (id, src, title) =>
    `
<div data-set="${id}" class="movie">
    <div class="poster">
        <img src="${src}" />
    </div>
    <div class="title">
        <h2>${title}</h2>
    </div>
</div>
`

// ________________________________________ //

const discover = async type => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_key}&certification_country=US&certification.lte=R&sort_by=vote_average.desc&with_original_language=en`

    // CONFIG
    const configRes = await fetch(
        `https://api.themoviedb.org/3/configuration?api_key=${API_key}`
    )
    const { images } = await configRes.json()
    const { base_url: baseURL, poster_sizes: posterSizes } = images

    const res = await fetch(url)
    const { results } = await res.json()

    showcase.innerHTML = results
        .filter(({ poster_path }) => poster_path)
        .reduce((arr, { id, title, poster_path: poster }) => {
            const src = `${baseURL}${posterSizes[2]}${poster}`
            const template = movieTemplate(id, src, title)
            arr.push(template)

            return arr
        }, [])
        .join('')

    console.log(results)
}

discover()
