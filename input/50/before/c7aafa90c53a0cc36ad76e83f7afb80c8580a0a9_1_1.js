function() {
    this.medias = this.node.audios || [];
    this.inherited(arguments);

    window.audioPlayer = this;
  }