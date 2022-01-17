function(pluginName, moduleName, write) {
    
    //all css defines made as empty, unless a write or buffer point
    //but we do inclusion on write not load for the optimizer (to allow exclusions!)
    if (moduleName.substr(0, 2) != '>>') {
      
      var file = moduleName.substr(moduleName.length - 1, 1) == '!';
      
      if (file)
        fileName = moduleName.substr(0, moduleName.length - 1);
      else
        fileName = moduleName;
        
      var loaded_css = loadFile(req.toUrl(fileName + '.css'));
      
      //check if we have a blocking file syntax for css
      if (file)
        this.fileBuffer += this.convertStyleBase(loaded_css, require.toUrl(fileName), require.toUrl('.'));
      //otherwise load into our standard buffer
      else
        this.buffer += this.convertStyleBase(loaded_css, require.toUrl(fileName), require.toUrl('.'));
      
      write.asModule(pluginName + '!' + moduleName, 'define(function(){})');
      return;
    }
    

    /*
      modules = [
      {
        main: 'my.css',
        include: ['css!some[ie]', 'css!>>my']
      },
      {
        name: 'another',
        include: ['css!thing', 'css!two', 'css!>>']
      }
      ];
    
      buffer points specified by 'css!>>', outputs the current buffer into the script (asynchronous)
      write and buffer points specified by 'css!>>my/file' to perform both at once
    
      write points specified by 'css!>my/file', output the fileBuffer with prefixes (blocking)
      so we get outputs: my/file.css, my/file.ie.css, my/file.print.css etc
    */
    
    //buffer / write point
    if (moduleName.substr(0, 2) == '>>')
      this.onBuildComplete(pluginName + '!' + moduleName, moduleName.substr(2), write);
  }