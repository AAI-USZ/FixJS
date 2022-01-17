function pv_play(target) {
    this.isPlaying = true;

    this.showInfo();

    if (target) {
      var targetIndex = parseInt(target.dataset.index);
      var songData = this.dataSource[targetIndex];

      TitleBar.changeTitleText((songData.metadata.title) ?
        songData.metadata.title : navigator.mozL10n.get('unknownTitle'));
      this.artist.textContent = (songData.metadata.artist) ?
        songData.metadata.artist : navigator.mozL10n.get('unknownArtist');
      this.album.textContent = (songData.metadata.album) ?
        songData.metadata.album : navigator.mozL10n.get('unknownAlbum');
      this.currentIndex = targetIndex;

      musicdb.getFile(this.dataSource[targetIndex].name, function(file) {
        // On B2G devices, file.type of mp3 format is missing
        // use file extension instead of file.type
        this.playingFormat = file.name.slice(-4);

        // An object URL must be released by calling URL.revokeObjectURL()
        // when we no longer need them
        var url = URL.createObjectURL(file);
        this.audio.src = url;
        this.audio.onloadeddata = function(evt) { URL.revokeObjectURL(url); };

        // when play a new song, reset the seekBar first
        // this can prevent showing wrong duration
        // due to b2g cannot get some mp3's duration
        // and the seekBar can still show 00:00 to -00:00
        this.setSeekBar(0, 0, 0);
      }.bind(this));
    } else {
      this.audio.play();
    }

    this.playControl.innerHTML = '||';
  }