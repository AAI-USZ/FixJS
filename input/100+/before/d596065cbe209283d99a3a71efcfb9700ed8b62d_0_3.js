function () {
      var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100) + 3, 10);
      options.loading.css({ width : loaded + '%'});
    }