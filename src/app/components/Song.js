export class Song {

    playAudio(songName) {
        let songs = document.querySelectorAll('#song');
        songs.forEach(song => {
            const cleanedSong = this.cleanAudio(song);
            if (cleanedSong === songName) {
                return song.paused ? song.play() : this.stopAudio(song);
            }
            // Avoid multiple songs
            if (!song.paused && cleanedSong !== songName) {
                return this.stopAudio(song);
            }
        });
    }

    stopAudio(audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    cleanAudio(audio) {
        const origin = audio.getAttribute('src');
        let cleaned = origin.replace('./assets/songs/', '');
        cleaned = cleaned.replace('.mp3', '');
        return cleaned;
    }
}