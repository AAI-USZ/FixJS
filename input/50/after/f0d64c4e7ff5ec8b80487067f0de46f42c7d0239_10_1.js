function() {
    return function(text) {
      return typeof Notebook !== "undefined" && Notebook !== null ? Notebook.svgMeasureText(text) : void 0;
    };
  }