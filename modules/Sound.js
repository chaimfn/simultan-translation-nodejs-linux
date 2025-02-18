const { spawn } = require('child_process');
const type = require("type-detect");

class Sound {
    playAudio(audioBuffer) {
        return new Promise((resolve, reject) => {
            const aplay = spawn('aplay', { shell: false });

            aplay.on('close', code => {
                console.log(`aplay exited with code ${code}`);
                if (code === 0) {
                    resolve();
                }
                else {
                    reject(new Error(`aplay failed with code ${code}`));
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