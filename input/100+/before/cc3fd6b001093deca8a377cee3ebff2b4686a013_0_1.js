function () {
    // not visible
    if (!this.visible) {
      // user active -> full
      if (this.userIsActive || this.locked || this.player.ended() || this.postrollVisible) {
        this.show('full');
      // user inactive, but timed comments -> half
      } else if (this.visibleTimedComments) {
        this.show('half');
      }
    // half visible
    } else if (this.visible === 'half') {
      // user active -> full
      if (this.userIsActive || this.locked || this.player.ended() || this.postrollVisible) {
        this.show('full');
      // user inactive and no timed comments -> hide
      } else if (!this.visibleTimedComments) {
        this.hide();
      }
    // fully visible
    } else {
      if (!this.userIsActive) {
        if (!this.visibleTimedComments && !this.locked && !this.player.ended() && !this.postrollVisible) {
          this.hide();
        } else if (this.visibleTimedComments) {
          this.show('half');
        }
      }
    }
  }