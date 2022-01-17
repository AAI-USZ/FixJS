function(media) {
    this.inherited(arguments);

    if (this.useHtml5Player) { return; }
    if(mulberry.Device.environment == 'native'){
      mulberry.app.PhoneGap.video.play(this.media.url);
    } else {
      mulberry.app.PhoneGap.browser.url(this.media.url);
    }
  }