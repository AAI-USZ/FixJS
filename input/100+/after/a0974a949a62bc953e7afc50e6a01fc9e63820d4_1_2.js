function(mode, cont) {
    if (_CodeMirror.modes.hasOwnProperty(mode)) return ensureDeps(mode, cont());
    if (loading.hasOwnProperty(mode)) return loading[mode].push(cont);

    var script = document.createElement("script");
    script.src = _CodeMirror.modeURL.replace(/%N/g, mode);
    var others = document.getElementsByTagName("script")[0];
    others.parentNode.insertBefore(script, others);
    var list = loading[mode] = [cont];
    var count = 0, poll = setInterval(function() {
      if (++count > 100) return clearInterval(poll);
      if (_CodeMirror.modes.hasOwnProperty(mode)) {
        clearInterval(poll);
        loading[mode] = null;
        ensureDeps(mode, function() {
          for (var i = 0; i < list.length; ++i) list[i]();
        });
      }
    }, 200);
  }