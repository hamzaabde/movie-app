// DOM selection
const search = document.querySelector('#search')
const showcase = document.querySelector('.showcase')

// creating items container
const item = createElement('div').classList.add('item')
const poster = createElement('img')
const title = createElement('h2').classList

function createElement(el) {
    return document.createElement(el)
}

function addClass(el, className) {
    if (Array.isArray(className)) {
        className.forEach(c => el.classList.add(c))
        return el
    }

    el.classList.add(className)
    return el
}
