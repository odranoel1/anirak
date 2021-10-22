export class Song {

    constructor() {
    }

    createAudioTag(event) {
        const songName = event.target.getAttribute('data-name');
        const audio = document.createElement('audio');
        audio.id = 'audio-player';
        audio.src = `https://anirak.s3.amazonaws.com/data/songs/${songName}.mp3`;
        event.target.appendChild(audio);
        return audio;
    }

    stopAudios(audioTag) {
        let audio = document.querySelectorAll('#audio-player');
        audio.forEach(audio => {
            if (audioTag.src !== audio.src) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    }

    playAudio(event) {
        let audioTag = event.target.children[0];
        if (!audioTag) {
            audioTag = this.createAudioTag(event);
        }
        this.togglePlay(audioTag);
        this.stopAudios(audioTag);
        return true;
    }

    togglePlay(audio) {
        return audio.paused ? audio.play() : audio.pause();
    }
}