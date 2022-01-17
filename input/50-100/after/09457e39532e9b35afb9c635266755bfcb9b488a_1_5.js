function (prefix) {
    iterList(["f", "F", "T", "t"],
      function (ch) {
        CodeMirror.keyMap[prefix][toCombo(ch)] = function (cm) {
          cm.setOption("keyMap", prefix + ch);
          emptyBuffer();
        };
      });
  }