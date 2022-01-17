function(media) {
    this.inherited(arguments);

    if (this.useHtml5Player) { return; }
    mulberry.app.PhoneGap.video.play(this.media.url);
  }