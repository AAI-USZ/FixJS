function(){
    textile.set("This is a paragraph.")
      .select("This")
      .off('link')
      .dialog('link', function(d){
        d.set('uri','src');
        d.click("Create");
      })
      .match(/This\":src/)
      .on('link');
  }