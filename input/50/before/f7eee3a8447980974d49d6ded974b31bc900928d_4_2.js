function(){
      var html = "<html><body>MyText</body></html>";
      var js = this.utils.convertHTMLtoJS(html);
    
      assert.typeOf(js, "string");
      assert.equals(this.appendSnippetCode("\nvar snippetsRaw = \"MyText\\n\" + \n\"\";"), js);
    }