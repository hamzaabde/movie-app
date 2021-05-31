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

const showCase = async trigger => {
    const frag = new DocumentFragment()

    const trendingUrl = compose.trendingUrl()
    const { results: trendingResults } = await fetchJson(trendingUrl)
    const trendingFrag = await getCategory('Trending', trendingResults)

    const topRatedUrl = compose.topRatedUrl()
    const { results: topRatedresults } = await fetchJson(topRatedUrl)
    const topRatedFrag = await getCategory('Top Rated', topRatedresults)

    const mostPopularUrl = compose.mostPopularUrl()
    const { results: mostPopularResults } = await fetchJson(mostPopularUrl)
    const mostPopularFrag = await getCategory(
        'Most Popular',
        mostPopularResults
    )

    const upcomingUrl = compose.upcomingUrl()
    const { results: upcomingResults } = await fetchJson(upcomingUrl)
    const upcomingFrag = await getCategory('Upcoming', upcomingResults)

    switch (trigger) {
        case 'all':
            frag.appendChild(trendingFrag)
            frag.appendChild(topRatedFrag)
            frag.appendChild(mostPopularFrag)
            frag.appendChild(upcomingFrag)
            break
        case 'trending':
            frag.appendChild(trendingFrag)
            break
        case 'top-rated':
            frag.appendChild(topRatedFrag)
            break
        case 'most-popular':
            frag.appendChild(mostPopularFrag)
            break
        case 'upcoming':
            frag.appendChild(upcomingFrag)
            break
    }

    document.querySelector('.showcase').appendChild(frag)
}

export default showCase
