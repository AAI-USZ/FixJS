function($video) {
      this.origSize = {
        width: $video[0].videoWidth,
        height: $video[0].videoHeight
      };
      return this._setUpdatedTransform();
    }