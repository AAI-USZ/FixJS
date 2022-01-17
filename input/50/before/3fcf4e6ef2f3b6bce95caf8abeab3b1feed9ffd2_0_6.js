function() {
      this.textArea
        .parent().show()
        .find(":first-child").focus()[0]
        .setSelectionRange(0,0);
      this.htmlDiv.attr("contentEditable",false);
    }