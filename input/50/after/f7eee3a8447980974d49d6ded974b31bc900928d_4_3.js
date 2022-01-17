function(){
      var html = "<html><body><a href='hello'>MyText</a></body></html>";
      var js = this.utils.convertHTMLtoJS(html);
    
      assert.equals(typeof(js), "string");
      assert.equals(this.appendSnippetCode("\nvar snippetsRaw = \"<a href='hello'>MyText</a>\\n\" + \n\"\";"), js);
    }