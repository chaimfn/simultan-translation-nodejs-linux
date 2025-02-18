const recorder = require('node-record-lpcm16');
const playSound = require('play-sound')({});
const fs = require('fs');
const typeDetect = require('type-detect');

class Sound {
    #resolve = null;
    #audioBuffer = null;
    #audioChunks = [];
    #recordingProcess = null;

    constructor() {}

    // הפונקציה תפסיק את ההקלטה
    stopRecording() {
        // עצירת ההקלטה
        this.#recordingProcess.stop();
        this.#audioBuffer = Buffer.concat(this.#audioChunks);
        this.#resolve(this.#audioBuffer); // מחזיר את ה-buffer שהוקלט
    }

    // הפונקציה תקלוט קול מהמיקרופון ותחזיר את ה-audio
    async record() {
        return new Promise((resolve, reject) => {
            this.#resolve = resolve;

            // נתחיל להקליט עם node-record-lpcm16
            this.#recordingProcess = recorder.record({
                sampleRateHertz: 16000,
                channels: 1,
                bitDepth: 16,
                encoding: 'signed-integer',
                endOnSilence: false,
            });

            console.log('Recording started');

            // נשמור את ה-audio שנקליט למערך
            this.#recordingProcess.pipe(fs.createWriteStream('output.raw')); // שמירה לקובץ raw
            
            // זיהוי סיום ההקלטה
            this.#recordingProcess.on('error', (err) => {
                reject(err);
            });
        });
    }

    // הפונקציה תקבל audio בפורמט ותחזיר אותו
    async playAudio(audio) {
        console.log('Audio type:', typeDetect(audio));
        return new Promise((resolve, reject) => {
            // נשתמש ב-play-sound כדי להשמיע את ה-audio
            const tempFile = '/tmp/audio.wav';
            fs.writeFileSync(tempFile, audio); // נשמור את הקובץ באופן זמני
            playSound.play(tempFile, (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
}

const sound = new Sound();

(async () => {
    try {
        const audio = await sound.record();
        setTimeout(() => {
            sound.stopRecording();
        }, 5000); // נעצור את ההקלטה אחרי 5 שניות

        await sound.playAudio(audio); // נשמיע את ה-Audio מייד לאחר ההקלטה
        fs.writeFileSync('output.wav', audio); // נשמור את הקובץ
    } catch (err) {
        console.error('Error:', err);
    }
})();
