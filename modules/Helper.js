const keypress = require('keypress');

const Keys = {
    CtrlC: '\x03',
    Esc: '\x1B',
    Space: ' '
}

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

function setKeypress(key, callback) {
    keypress(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (c, k) => {
        console.log(c, k)
        if (k && k.sequence === key) {
            process.stdin.pause();
            if (callback) {
                callback();
            }
        }
    });
    process.stdin.resume();
}

module.exports = {
    Keys,
    formatDate,
    setKeypress
}