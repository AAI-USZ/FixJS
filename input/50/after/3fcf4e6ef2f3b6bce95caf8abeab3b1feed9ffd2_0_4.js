function(editor) {
      console.log("updating preview in Mode " + this.name);
      editor.htmlDiv.html(this.toHTML(editor) || "<p>&nbsp;</p>");
    }