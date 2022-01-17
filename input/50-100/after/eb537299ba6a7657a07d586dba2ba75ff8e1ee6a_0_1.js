function(data) {
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
          z.overlay.hide();
        }
      }