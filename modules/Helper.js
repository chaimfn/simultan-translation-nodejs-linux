function formatDate() {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    return new Date()
        .toLocaleString('en-CA', options)
        .replace(/, /g, '_')
        .replace(/:/g, '-');
}

module.exports = {
    formatDate
}