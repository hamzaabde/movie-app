const searchBar = document.querySelector('header > .search-form > input')

const getSearchQuery = e => {
    const query = searchBar.value

    if (query) return query

    return null
}

export default getSearchQuery
