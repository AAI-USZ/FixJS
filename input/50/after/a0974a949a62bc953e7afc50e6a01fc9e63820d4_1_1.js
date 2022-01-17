function(instance, mode) {
    if (!_CodeMirror.modes.hasOwnProperty(mode))
      _CodeMirror.requireMode(mode, function() {
        instance.setOption("mode", instance.getOption("mode"));
      });
  }