function itemClick(e) {

    

    var curr = e.target;
    if (curr.tagName == "SPAN") {
      curr = $(curr).parent();
    } else {
      curr = $(curr);
    }

    e.stopPropagation();

    if (currFile) {
      if (curr[0] == currFile[0]) {
        z.overlay.hide();
        return;
      }
    }


    z.docMenu.hide();
    if (z.saveOnClick) {
      z.saveFileFolder();
    }




    if (curr.hasClass("file")) {

      if (currFile) {
        currFile.css({
          fontWeight: "normal"
        });
      }
      currFile = curr;
      curr.css({
        fontWeight: "bold"
      });
      var path = curr.attr("data-path");
      var ext = curr.attr("data-ext");

      //z.overlay.show();
      scrollMemory[z.currentPath] = z.codeIframe.scrollTop();

      loadFile(path);

      z.overlay.show();

      codeHighlight(ext);
    } else if (curr.hasClass("directory")) {

      curr.children("ul").first().slideToggle();
    }
  }