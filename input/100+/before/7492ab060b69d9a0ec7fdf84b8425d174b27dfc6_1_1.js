function(pluginName, moduleName, write) {
    
    //all css defines made as empty, unless a write or buffer point
    //but we do inclusion on write not load for the optimizer (to allow exclusions!)
    if (moduleName.substr(0, 1) != '>') {
      
      var linkSuffix = moduleName.match(/\[([^\]]*)\]/);
      var fileName = moduleName;
      if (linkSuffix) {
        linkSuffix = linkSuffix[1];
        if (linkSuffix != '')
          fileName = moduleName.replace(/\[([^\]]*)\]/, '-$1');
        else
          fileName = moduleName.replace(/\[([^\]]*)\]/, '');
      }
        
      var loaded_css = loadFile(req.toUrl(fileName + '.css'));
      
      //check if we have a link suffix for building into a file instead of script
      if (linkSuffix !== null) {
        this.linkBuffer[linkSuffix] = this.linkBuffer[linkSuffix] || '';
        this.linkBuffer[linkSuffix] += this.convertStyleBase(loaded_css, require.toUrl(fileName), require.toUrl('.'));
      }
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
    
      write points specified by 'css!>my/file', output the linkBuffer with prefixes (blocking)
      so we get outputs: my/file.css, my/file.ie.css, my/file.print.css etc
    */
    
    //buffer point
    if (moduleName.substr(0, 2) == '>>') {
      var output = compress(css.escape(css.buffer));
      if (output != '')
        write('require([\'css\'], function(css) {\n  css.add("' + output + '");\n})');
      css.buffer = '';
    }
    
    //write point
    var fileName = moduleName.replace(/^>{1,2}/, '');
    if (fileName != '') {
      console.log(moduleName);
      console.log(fileName);
      for (var suffix in this.linkBuffer) {
        var output = compress(css.convertStyleBase(this.linkBuffer[suffix], require.toUrl('.'), require.toUrl(fileName)));
        if (output != '')
          saveFile(require.toUrl(fileName + (suffix ? '-' + suffix : '') + '.css'), output);
        this.linkBuffer[suffix] = '';
      }
    }
  }