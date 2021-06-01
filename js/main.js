import { toggleFilter, getSelectedFilter } from './filter.js'
import showCase from './dom.js'
import getSearchQuery from './search.js'

const run = () => {
    document
        .querySelector('.filter')
        .querySelectorAll('span')
        .forEach(option => {
            option.addEventListener('mousedown', e => {
                toggleFilter(e)

                showCase(getSelectedFilter())
            })
        })

    document.querySelector('#submit').addEventListener('click', e => {
        showCase('search', getSearchQuery(e))
    })

    showCase(getSelectedFilter())
}

run()
