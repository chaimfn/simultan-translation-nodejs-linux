const { Recorder } = require("./modules/Record");
const fs = require("fs");
const { Sound } = require("./modules/Sound");
const { formatDate, setKeypress, Keys } = require("./modules/Helper");
const { exit } = require("process");


function keypressCallback(key, pause) {
    console.log("main keypressCallback. key:", key, "pause:", pause)
}

(async () => {
    const recorder = new Recorder();
    const sound = new Sound();
    const audioPath = `./records/${formatDate()}.wav`;

    setKeypress(keypressCallback)

    // setKeypress((key, pause) => {
    //     console.log("main setKeypress callback. key:", key, "pause:", pause);
    //     if(key == Keys.Space) {
    //         recorder.stop();
    //     }
    //     else if (key == Keys.CtrlC) {
    //         exit(0);
    //     }
    // });

    const buffer = await recorder.start();
    fs.writeFileSync(audioPath, buffer, { encoding: 'binary' });
    sound.playAudio(buffer);
})();