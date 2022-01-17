function itemClick(e) {

    var curr = e.target;
    if (curr.tagName == "SPAN") {
      curr = $(curr).parent();
    } else {
      curr = $(curr);
    }

    e.stopPropagation();

    if (curr == currFile) {
      return;
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

      scrollMemory[z.currentPath] = z.codeIframe.scrollTop();

      loadFile(path);



      codeHighlight(ext);
    } else if (curr.hasClass("directory")) {

      curr.children("ul").first().slideToggle();
    }
  }