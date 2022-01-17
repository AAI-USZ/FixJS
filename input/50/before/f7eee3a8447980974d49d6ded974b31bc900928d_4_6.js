function(){
      var html = "<html><body>MyText\nRemoveLine<!-- exclude LINE -->\nLastLine</body></html>";
      var js = this.utils.convertHTMLtoJS(html);
    
      assert.typeOf(js, "string");
      assert.equals(this.appendSnippetCode("\nvar snippetsRaw = \"MyText\\n\" + \n\"LastLine\\n\" + \n\"\";"), js);
    }