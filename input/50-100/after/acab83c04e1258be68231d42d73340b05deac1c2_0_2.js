function() {
                                       this._stateCounts[thumbnail.state]--;
                                       thumbnail.state = ThumbnailState.DESTROYED;

                                       let index = this._thumbnails.indexOf(thumbnail);
                                       this._thumbnails.splice(index, 1);
                                       thumbnail.destroy();

                                       if (index < this._kbThumbnailIndex ||
                                           (index === this._kbThumbnailIndex &&
                                               index === this._thumbnails.length))
                                       {
                                           --this._kbThumbnailIndex;
                                       }

                                       this._queueUpdateStates();
                                   }