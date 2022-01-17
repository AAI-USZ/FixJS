function(responses, nobj) { 
    // If there's no obj variable, this isn't being called from a closure so use the function argument instead
    if (typeof ajaxlibobj == 'undefined') { 
      var ajaxlibobj = nobj;
    }
    if (
      (typeof elation.search != 'undefined' && typeof elation.search.backbutton != 'undefined') && 
      (typeof search != 'undefined' && search.urlhash) && 
      (typeof ajaxlibobj != 'undefined' && ajaxlibobj.url == '' && !elation.utils.isTrue(ajaxlibobj.ignore))
    ) {
      elation.search.backbutton.add(responses, ajaxlibobj);
    }
    
    // Used to keep track of registered dependencies, etc. while all responses are processed
    var common = { 
      inlinescripts: [],
      data: {},
      dependencies: {}
    };
		
    for (var i = 0; i < responses.length; i++) {
      var type = responses[i].type || 'xhtml';
      
      if (typeof this.responsehandlers[type] == 'function') {
        this.responsehandlers[type](responses[i], common);
      } else {
        console.log('No handler for type ' + type);
      }
    }
		
    // Process all CSS and JS dependencies into URLs
    var cssparms = '', javascriptparms = '';
    for (var key in common.dependencies.css) {
      if (common.dependencies.css.hasOwnProperty(key)) {
        if (common.dependencies.css[key].length > 0) {
          cssparms += key + '=' + common.dependencies.css[key].join('+') + '&';
        }
      }
    }
    for (var key in common.dependencies.javascript) {
      if (common.dependencies.javascript.hasOwnProperty(key)) {
        if (common.dependencies.javascript[key].length > 0) {
          javascriptparms += key + '=' + common.dependencies.javascript[key].join('+') + '&';
				}
      }
    }
    var batch = new elation.file.batch();
    if (cssparms.length > 0)
      batch.add('/css/main?'+cssparms.substr(0,cssparms.length-1),'css');
    if (javascriptparms.length > 0)
      batch.add('/scripts/main?'+javascriptparms.substr(0,javascriptparms.length-1),null,true);
		
    common.inlinescripts.push("elation.component.init();");
    
    // Execute all inline scripts
    var execute_scripts = function() {
      if (common.inlinescripts.length > 0) {
        var script_text = '';
        for (var i = 0; i < common.inlinescripts.length; i++) {
          if (!common.inlinescripts[i] || typeof common.inlinescripts[i] == 'undefined') 
            continue;
          else
            script_text += common.inlinescripts[i] + '\n';
        }
        try {
          eval(script_text);
        } catch(e) {
          try {
            batch.callback(script_text);
          } catch(e) {
            console.log('-!- ajaxlib inlinescript warning: ' + e.message);
          }
        }
      }
    }
		
    // FIXME - this had a delay of 1ms when type='data' and name='infobox.data' was passed, I'm sure there was a reason but it doesn't work with the way this is done now... 
    execute_scripts();  // no timer makes priceslider happy!  no ugly delay.
    
    // If caller passed in a callback, execute it
    if (typeof ajaxlibobj != 'undefined' && ajaxlibobj.callback) {
      try {
        elation.ajax.executeCallback(ajaxlibobj.callback, common.data);
      } catch(e) {
        batch.callback(function() { elation.ajax.executeCallback(ajaxlibobj.callback, common.data); });
      }
    }
  }