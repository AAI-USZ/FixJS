function codeHighlight(ext) {

    if (ext == "php" || ext == "html" || ext == "htm" || ext == "xml" || ext == "txt" || ext == "csv") {
      z.editor.setParser("PHPHTMLMixedParser");
    } else if (ext == "js" || ext == "json") {
      z.editor.setParser("JSParser");

    } else if (ext == "css") {
      z.editor.setParser("CSSParser");
    } else {
      // z.editor.setParser("");
    }
  }