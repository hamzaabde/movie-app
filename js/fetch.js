import { currentDate } from './utils.js'

const API_key = 'ea5cd35b72ddaaeb23a64fe8f407038e'

const fetchJson = async url => {
    const res = await fetch(url)
    const json = await res.json()

    return json
}

const fetchConfigs = async () => {
    const url = `https://api.themoviedb.org/3/configuration?api_key=${API_key}`
    const configs = await fetchJson(url)

    return configs
}

const composeTrendingUrl = () => {
    return `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_key}&sort_by=popular.desc&with_original_language=en`
}

const composeTopRatedUrl = () => {
    const sortBy = '&sort_by=vote_average.desc'
    const certification = '&certification_country=US'
    const queries = `${certification}${sortBy}`

    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_key}${queries}&with_original_language=en`
}

const composeUpcomingUrl = () => {
    const releaseDate = `&primary_release_date.gte=${currentDate()}`
    const queries = `${releaseDate}`

    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_key}${queries}&with_original_language=en`
}

const composeMostPopularUrl = () => {
    const sortBy = '&with_original_language=en&sort_by=popularity.desc'
    const certification = '&certification_country=US'
    const queries = `${certification}${sortBy}`

    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_key}${queries}`
}

const composeSearchUrl = query => {
    const urlQuery = encodeURI(query)
    const certification = '&certification_country=US&with_original_language=en'
    return `https://api.themoviedb.org/3/search/movie?api_key=${API_key}&region=US&include_adult=false&query=${urlQuery}`
}

const composePosterUrl = async (posterSrc, posterSize = 3) => {
    const { images } = await fetchConfigs()
    if (posterSrc == null) return '/no-poster.jpeg'
    return `${images.secure_base_url}${images.poster_sizes[posterSize]}${posterSrc}`
}

const compose = {
    mostPopularUrl: composeMostPopularUrl,
    topRatedUrl: composeTopRatedUrl,
    trendingUrl: composeTrendingUrl,
    searchUrl: composeSearchUrl,
    posterUrl: composePosterUrl,
    upcomingUrl: composeUpcomingUrl,
}

export { compose, fetchJson, fetchConfigs }
