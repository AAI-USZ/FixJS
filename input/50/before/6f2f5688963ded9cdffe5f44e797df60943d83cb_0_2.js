function createEditorContainer(element) {
      var container = $("<div/>");
      container.attr("id", "editor-" + element.attr("id"));
      container.addClass("ace-editor");
      element.after(container)
      return container;
    }