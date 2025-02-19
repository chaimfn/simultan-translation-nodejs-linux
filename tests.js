const { setKeypress, Keys } = require("./modules/Helper")


console.log("Start");

let lang = "he"
async function switchParticipant() {
    lang = lang == "he"? "en" : "he"
    console.log(lang)
}


async function keypressCallback(key) {
    console.log(1, key)
    key == Keys.CtrlC && process.exit(0);
    key == Keys.Space && await switchParticipant();
}


setKeypress(keypressCallback);
