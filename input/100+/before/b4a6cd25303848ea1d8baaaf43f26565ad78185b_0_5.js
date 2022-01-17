function(stderrString, totalDurationSec) {
    // get last stderr line
    var lastLine = stderrString.split(/\r\n|\r|\n/g);
    var ll = lastLine[lastLine.length - 2];
    var progress = ll.split(/frame=([0-9\s]+)fps=([0-9\s]+)q=([0-9\.\s]+)(L?)size=([0-9\s]+)kB time=(([0-9]{2}):([0-9]{2}):([0-9]{2}).([0-9]{2})) bitrate=([0-9\.\s]+)kbits/ig);
    if (progress && progress.length > 10) {
      // build progress report object
      var ret = {
        frames: parseInt(progress[1]),
        currentFps: parseInt(progress[2]),
        currentKbps: parseFloat(progress[10]),
        targetSize: parseInt(progress[5]),
        timemark: progress[6]
      };

      // calculate percent progress using duration
      if (totalDurationSec && totalDurationSec > 0) {
        ret.percent = (this.ffmpegTimemarkToSeconds(ret.timemark) / totalDurationSec) * 100;
      }

      this.options.onProgress(ret);
    }
  }