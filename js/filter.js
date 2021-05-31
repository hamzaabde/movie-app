const filterContainer = document.querySelector('.filter')

const getSelectedFilter = () => {
    return filterContainer.querySelector('.active').dataset.option
}

const toggleFilter = ({ target }) => {
    const filters = filterContainer.querySelectorAll('span')

    filters.forEach(filter => {
        if (filter !== target) {
            filter.classList.remove('active')
        } else {
            filter.classList.add('active')
        }
    })
}

filterContainer.querySelectorAll('span').forEach(option => {
    option.addEventListener('mousedown', toggleFilter)
})

export default getSelectedFilter
