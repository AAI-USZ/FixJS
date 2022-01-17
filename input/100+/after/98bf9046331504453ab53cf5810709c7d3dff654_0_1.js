function() {
    // this is not ideal, since it sort of breaks the idea of components. But it
    // will work until we get a proper solution for modal windows.
    var contentRegion = dojo.query('.page-content')[0], audioCount = this.page.baseObj.audios.length;
    this.coverDiv = document.createElement('div');

    dojo.addClass(this.coverDiv, ['cover', 'hidden']);
    dojo.connect(this.coverDiv, 'click', this, function(e) {
      e.preventDefault();
      e.stopPropagation();
      this._hidePlaylist();
    });

    contentRegion.appendChild(this.coverDiv);

    if (audioCount <= 1) {
      this.playlistButton.hide();
    }

    this.audioList.region.domNode.addEventListener('webkitTransitionEnd', function(event) {
      dojo.publish('/content/update');
    }, false);
  }