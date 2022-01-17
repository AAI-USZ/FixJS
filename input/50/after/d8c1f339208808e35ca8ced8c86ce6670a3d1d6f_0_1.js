function(event) {
    event.stopPropagation();
    return CSP.showBlob($(this), {
      download: "Download this set list if you're interested helping out. Then close this dialog and scroll down, to read more about contributing to the project.",
      broken: "This set list hasn't yet been split. If you're intersted in helping out, close this dialog and scroll down, to read more about contributing to the project."
    });
  }