function (file) {

          if (file) {
            var id = file.get("id");
            if (this.currentFiles[id]) {
              this.currentFiles[id].cancelUpload();
              this._unregisterUpload(this.currentFiles[id]);
            }
            else {
              for (var i = 0, len = this.queuedFiles.length; i < len; i++) {
                if (this.queuedFiles[i].get("id") === id) {
                  this.queuedFiles.splice(i, 1);
                  break;
                }
              }
            }
          }
          else {
            for (var fid in this.currentFiles) {
              this.currentFiles[fid].cancelUpload();
              this._unregisterUpload(this.currentFiles[fid]);
            }

            this.currentUploadedByteValues = {};
            this.currentFiles = {};
            this.totalBytesUploaded = 0;
            this.fire("alluploadscancelled");
            this._currentState = UploaderQueue.STOPPED;
          }
        }