function(){
    textile.set("This\n\nThat")
      .selectAll()
      .change(".formatBlock", "h1")
      .match(/h1. This/)
      .match(/h1. That/);
  }