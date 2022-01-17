function() {
                                       this._stateCounts[thumbnail.state]--;
                                       thumbnail.state = ThumbnailState.DESTROYED;

                                       let index = this._thumbnails.indexOf(thumbnail);
                                       this._thumbnails.splice(index, 1);
                                       thumbnail.destroy();

                                       this._queueUpdateStates();
                                   }