function(err, meta) {

        if (!meta.durationsec) {
          var errString = 'meta data contains no duration, aborting screenshot creation';
          self.options.logger.warn(errString);
          return callback(new Error(errString));
        }

        // check if all timemarks are inside duration
        if (timemarks !== null) {
          for (var i = 0; i < timemarks.length; i++) {
            /* convert percentage to seconds */
            if( timemarks[i].indexOf('%') > 0 ) {
              timemarks[i] = (parseInt(timemarks[i], 10) / 100) * meta.durationsec;
            }
            if (parseInt(timemarks[i], 10) > (meta.durationsec * 0.9)) {
              // remove timemark from array
              timemarks.splice(i, 1);
            }
          }
          // if there are no more timemarks around, add one at end of the file
          if (timemarks.length === 0) {
            timemarks[0] = (meta.durationsec * 0.9);
          }
        }
        // get positions for screenshots (using duration of file minus 10% to remove fade-in/fade-out)
        var secondOffset = (meta.durationsec * 0.9) / screenshotcount;
        var donecount = 0;
        var series = [];

        // reset iterator
        var j = 1;

        var filenames = [];

        // use async helper function to generate all screenshots and
        // fire callback just once after work is done
        async.until(
          function() {
            return j > screenshotcount;
          },
          function(taskcallback) {
            var offset;
            if (timemarks !== null) {
              // get timemark for current iteration
              offset = timemarks[(j - 1)];
            } else {
              offset = secondOffset * j;
            }
            var fname = _renderOutputName(j, offset) + '.jpg';
            var target = self.escapedPath(folder + '/' + fname);
            var input = self.escapedPath(self.options.inputfile);

            // build screenshot command
            var command = [
              self.ffmpegPath,
              [
                '-ss', offset,
                '-i', input,
                '-vcodec', 'mjpeg',
                '-vframes', '1',
                '-an',
                '-f', 'rawvideo',
                '-s', self.options.video.size,
                '-y', target
                ].join(' ')
            ];

            j++;

            // only set niceness if running on a non-windows platform
            if (self.options.hasOwnProperty('_nice.level') && !os.match(/win(32|64)/)) {
              // execute ffmpeg through nice
              command.unshift('nice -n', self.options._nice.level||0);
            }

            exec(command.join(' '), taskcallback);
            filenames.push(fname);
          },
          function(err) {
            callback(err, filenames);
          }
        );
      }