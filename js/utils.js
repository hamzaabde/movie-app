const currentDate = () => {
    const date = new Date()
    return date
        .toLocaleDateString('ko-KR', { timeZone: 'UTC' })
        .replaceAll(/\.(?=.+)/g, '-')
        .replaceAll(/(?<=\D+)(\d){1}/g, '0$1')
        .replaceAll(/(\s|\.)/g, '')
}

export { currentDate }
