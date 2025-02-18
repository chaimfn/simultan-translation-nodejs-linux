const { Recorder } = require("./modules/Record");
const fs = require("fs");
const { Sound } = require("./modules/Sound");

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

(async () => {
    const recorder = new Recorder();
    const sound = new Sound();
    const audioPath = `./records/${formatDate()}.wav`;
    setTimeout(() => {
        recorder.stop()
    }, 5000);

    const buffer = await recorder.start();
    fs.writeFileSync(audioPath, buffer, { encoding: 'binary' });
    sound.playAudio(buffer);
})();