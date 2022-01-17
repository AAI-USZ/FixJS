function(data) {
      $.jsperanto.init(function(t) {}, {
        interpolationPrefix: '%',
        interpolationSuffix: '%',
        keyseparator: '//',
        dictionary: data
      });
    }