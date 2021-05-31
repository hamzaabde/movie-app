import showCase from './dom.js'

showCase('all')

const run = () => {
    filterContainer.querySelectorAll('span').forEach(option => {
        option.addEventListener('mousedown', toggleFilter)
    })
}
