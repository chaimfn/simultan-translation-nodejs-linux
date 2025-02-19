const record = require('node-record-lpcm16');
const { Writable } = require('stream');
const type = require('type-detect');



class Recorder {
    #audioBuffer = null;
    #writableStream = null;
    #resolve = null;
    #recorder = null;
    #isRecording = false;

    constructor() {
        this.#audioBuffer = [];
        this.#writableStream = new Writable({
            write: (chunk, encoding, callback) => {
                console.log(`Recorder.#writableStream write. chunk: ${type(chunk)}. encoding: ${encoding}`);
                this.#audioBuffer.push(chunk);
                callback();
            }
        });
    }

    async start() {
        console.log("Recorder.start");
        this.#isRecording = true;
        return new Promise((resolve, reject) => {
            this.#resolve = resolve;
            this.#recorder = record.record();
            this.#recorder.stream().pipe(this.#writableStream);
        })
    }

    stop() {
        console.log("Recorder.stop");
        if (this.#isRecording == false) return;
        if (!!this.#recorder) {
            this.#recorder.stop();
            this.#resolve(Buffer.concat(this.#audioBuffer));
            this.#isRecording = false;
        }
    }
}



module.exports = {
    Recorder
}
