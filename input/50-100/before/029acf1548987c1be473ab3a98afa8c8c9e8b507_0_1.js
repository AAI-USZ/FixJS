function doneSeeking() {
          try {
            var canvas = document.createElement('canvas');
            canvas.width = THUMBNAIL_WIDTH;
            canvas.height = THUMBNAIL_HEIGHT;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(testplayer, 0, 0, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
            videodata.poster = canvas.mozGetAsFile('poster', 'image/jpeg');
          }
          catch (e) {
            console.error('Failed to create a poster image:', e);
          }

          addVideo(videodata);
        }