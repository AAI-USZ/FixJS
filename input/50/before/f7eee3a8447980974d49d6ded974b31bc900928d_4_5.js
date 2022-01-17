function(){
      var html = "<html><body>MyText\nNewLine</body></html>";
      var js = this.utils.convertHTMLtoJS(html);
    
      assert.typeOf(js, "string");
      assert.equals(this.appendSnippetCode("\nvar snippetsRaw = \"MyText\\n\" + \n\"NewLine\\n\" + \n\"\";"), js);
    }