function () {
    (function (folder) {
      _(folder.folders).each(arguments.callee);
      folder.sortFolder();
    })(this.root);
  }