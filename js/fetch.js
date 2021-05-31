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
    return `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_key}&sort_by=popular.desc`
}

const composeTopRatedUrl = () => {
    const sortBy = '&sort_by=vote_average.desc'
    const certification = '&certification_country=US&certification.lte=R'
    const queries = `${certification}${sortBy}`

    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_key}${queries}`
}

const composeUpcomingUrl = () => {
    const releaseDate = `&release_date.gte=${currentDate()}`
    const certification = '&certification_country=US&certification.lte=R'
    const queries = `${certification}${releaseDate}`

    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_key}${queries}`
}

const composeMostPopularUrl = () => {
    const sortBy = '&sort_by=popularity.desc'
    const certification = '&certification_country=US&certification.lte=R'
    const queries = `${certification}${sortBy}`

    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_key}${queries}`
}

const composeSearchUrl = query => {
    const urlQuery = encodeURI(query)
    return `https://api.themoviedb.org/3/search/movie?api_key=${API_key}&region=US&include_adult=false${urlQuery}`
}

const composePosterUrl = async (posterSrc, posterSize = 3) => {
    const { images } = await fetchConfigs()
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
