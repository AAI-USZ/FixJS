function loadFile(name) {
    //console.log(name);
    if (lastLoaded == name) {
      return;
    }
    lastLoaded = name;
    if (name.match(z.editableTypes)) {
      z.currentPath = name;
      z.updatePreview();
      $.post("load_file.php", {
        name: name
      }, function(data) {
        if (data == "ztxt:error:ztxt") {
          alert("!switching files too fast bug - reload page")
        } else {
          z.editor.setCode(data);
          z.codeBorder.show();
          z.fileName.text(z.splitLast(name, "/"));
          if (scrollMemory[z.currentPath]) {
            z.codeIframe.scrollTop(scrollMemory[z.currentPath]);
          } else {
            z.codeIframe.scrollTop(0);
          }
        }
      });
    } else if (name.match(z.imageTypes)) {
      z.codeBorder.hide();
      z.currentPath = undefined;
      z.previewFrame.attr("src", name);
    } else {
      alert(name + "\nSorry ztxt doesn't work with that kind of file.");
    }
  }