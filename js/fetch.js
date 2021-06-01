import { currentDate } from './utils.js'

const API_key = 'ea5cd35b72ddaaeb23a64fe8f407038e'

const certification = '&certification_country=US&certification.lte=R'
const adults = '&include_adult=false'
const language = '&with_original_language=en'

const commonParams = `${certification}${adults}${language}`

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
    const trending = 'ort_by=popular.desc'
    return `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_key}${commonParams}`
}

const composeTopRatedUrl = () => {
    const topRated = '&sort_by=vote_count.desc'

    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_key}${commonParams}${topRated}`
}

const composeUpcomingUrl = () => {
    const releaseDate = `&primary_release_date.gte=${currentDate()}`

    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_key}${commonParams}${releaseDate}`
}

const composeMostPopularUrl = () => {
    const popular = '&with_original_language=en&sort_by=popularity.desc'

    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_key}${commonParams}${popular}`
}

const composeSearchUrl = query => {
    query = `&query=${encodeURI(query)}`
    return `https://api.themoviedb.org/3/search/movie?api_key=${API_key}${commonParams}${query}`
}

const composePosterUrl = async (posterSrc, posterSize = 3) => {
    const { images } = await fetchConfigs()
    if (posterSrc == null) return 'no-poster.jpeg'
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
