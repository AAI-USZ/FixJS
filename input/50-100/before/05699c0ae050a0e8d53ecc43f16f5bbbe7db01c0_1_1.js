function(audioId) {
    if (this.audioPlayer.isPlaying && this.audioPlayer.media.id == audioId) {
      this.audioPlayer.pause();
    } else {
      this.audioPlayer.play(audioId);
    }
  }