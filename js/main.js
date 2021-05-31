import getSelectedFilter from './filter.js'
import { compose, fetchJson } from './fetch.js'
import { MovieTile, CategoryContainer } from './components.js'

const getCategory = async (category, results) => {
    const tiles = new DocumentFragment()
    for (let movie of results) {
        const {
            id,
            title,
            release_date: releaseDate,
            poster_path: poster,
        } = movie
        const imgSrc = await compose.posterUrl(poster)
        tiles.appendChild(MovieTile(id, imgSrc, title, releaseDate))
    }

    return CategoryContainer(category, tiles)
}

const populateShowcase = async () => {
    const frag = new DocumentFragment()

    const trendingUrl = compose.trendingUrl()
    const { results } = await fetchJson(trendingUrl)
    const trending = await getCategory('Trending', results)
    frag.appendChild(trending)

    document.querySelector('.showcase').appendChild(frag)
}

populateShowcase()
