const keypress = require('keypress');
const type = require("type-detect");

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

const Keys = {
    CtrlC: '\x03',
    Esc: '\x1B',
    Space: ' '
}

function setKeypress(callback) {
    if (!callback) {
        throw new Error("null args: 'callback'");
    }
    if (type(callback) != type(Function)) {
        throw new Error("'callback' must be a function");
    }

    keypress(process.stdin);
    process.stdin.on('keypress', (char, key) => { callback(key.sequence) })
    process.stdin.setRawMode(true);
    process.stdin.resume();
}

module.exports = {
    Keys,
    formatDate,
    setKeypress
}