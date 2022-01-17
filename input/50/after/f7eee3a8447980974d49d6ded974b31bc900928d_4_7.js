function(){
      var html = "<html><body>MyText\n<!-- exclude START -->\nRemoveLine1\nRemoveLine2\n<!-- exclude END -->\nLastLine</body></html>";
      var js = this.utils.convertHTMLtoJS(html);
    
      assert.equals(typeof(js), "string");
      assert.equals(this.appendSnippetCode("\nvar snippetsRaw = \"MyText\\n\" + \n\"LastLine\\n\" + \n\"\";"), js);
    }