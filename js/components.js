const div = document.createElement('div')
const img = document.createElement('img')
const h2 = document.createElement('h2')
const h3 = document.createElement('h3')
const span = document.createElement('span')

const MovieTile = (id, imgSrc, titleText, releaseDate) => {
    const movie = div.cloneNode()
    movie.classList.add('movie')
    movie.setAttribute('data-id', id)

    const info = div.cloneNode()
    info.classList.add('info')

    const poster = div.cloneNode()
    poster.classList.add('poster')

    const image = div.cloneNode()
    image.classList.add('image')
    image.setAttribute('load', 'lazy')

    const posterImg = img.cloneNode()
    posterImg.src = imgSrc

    const title = h3.cloneNode()
    title.textContent = titleText

    const release = span.cloneNode()
    release.textContent = releaseDate

    info.appendChild(title)
    info.appendChild(release)
    image.appendChild(posterImg)
    poster.appendChild(image)
    movie.appendChild(poster)
    movie.appendChild(info)

    return movie
}

const CategoryContainer = (titleText, tileNodesFragment) => {
    const title = h2.cloneNode()
    title
    title.textContent = titleText

    const tileContainer = div.cloneNode()
    tileContainer.classList.add('tile-container')
    tileContainer.appendChild(tileNodesFragment)

    const categoryContainer = div.cloneNode()
    categoryContainer.classList.add('category-container')
    categoryContainer.appendChild(title)
    categoryContainer.appendChild(tileContainer)

    return categoryContainer
}

export { MovieTile, CategoryContainer }
