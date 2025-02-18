const { spawn } = require('child_process');
const type = require("type-detect");

class Sound {
    playAudio(audioBuffer) {
        return new Promise((resolve, reject) => {
            const aplay = spawn('aplay', { shell: false });

            aplay.on('close', code => {
                if (code == 0) {
                    resolve();
                }
                else {
                    reject(`Sound.playAudio aplay.on('close'). code: ${code}`);
                }
            });
            aplay.stderr.on('data', (data) => {
                if (type(data) != type(new Uint8Array)) {
                    console.error(`Sound.playAudion aplay.stderr.on('data'). ${type(data)}:`, data);
                }
            });
            aplay.stdin.write(audioBuffer);
            aplay.stdin.end();
        });
    }
}


module.exports = {
    Sound
}