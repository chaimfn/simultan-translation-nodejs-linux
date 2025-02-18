const { Recorder } = require("./modules/Record");
const fs = require("fs");
const { Sound } = require("./modules/Sound");
const { formatDate } = require("./modules/Helper");

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