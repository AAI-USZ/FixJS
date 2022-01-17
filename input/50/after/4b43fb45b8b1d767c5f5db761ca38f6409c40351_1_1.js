function(url, content, type) {
      editorsByURL[url] = new PurpleOrionEditor(url, content, type);
    }