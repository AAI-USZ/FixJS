function(panel) {
  console.log('purple-panel',JSON.stringify(panel),panel);

  var panel_window; // the panel does not load until shown,
  var buffer;       // so we may need to buffer resource info,
  var panel_isReady; // until we flip this flag

  var resource_cache = {};

  // load resource code into the editor
  //
  function load(url, content, type, line) {
    if (panel_isReady) {
      panel_window.purple.showContent(url, content, type);
      panel_window.purple.setCursorOn(url, line || 1, 1);
    } else {
      buffer = Array.prototype.slice.apply(arguments);
      console.log('buffering load', buffer);
    }
  }

  // commit changes made to resource code
  function save(url, content) {
    console.assert(editor);
    console.log('saving', editor.getValue());
    var resource = resource_cache[url];
    if (resource) {
      resource.setContent(content, true, function(status){
        if (status && status.isError) {
          console.error('Could\'t save Resource:', status);
          return false;
        } else {
          console.log('Resource saved!');
          return true;
        }
      });
    } else {
      console.error("devtools has no resource at "+url);
      return false;
    }
  }

  function onAttach(connection) {
    console.log(window.location + ' attach');

    // Add initial methods for the panel to use
    //
    connection.register(
      'hello',        // URL for commands from panel to devtools
      {
        // feature documentation
        options: function() {
          return {
            put: 'body ignored; {message:}'
          };
        },
        
        // When the panel sends us "hello", finally we can dequeue any buffers
        put: function (obj) {
          return {message:'hey'};
        }
      }
    );

    function childErr(err) {
      console.error("Child recvd err", err);
    }

    // Send something to the 'purplePanel'
    //
    connection.putObject( 
      'hello',                      // at this URL
      {message:'I am your creator'},  // store this object
      function(reply) {             // then call me
        // Just log for the demo
        console.log("Creator hears: "+reply.message, reply);
      },        
      childErr                      // or fail
    );
    
    panel_isReady = true;
    if (buffer) {
      console.log('loading buffer', buffer);
      load.apply(null, buffer);
      buffer = null;
    }

  }

  // as panels load lazily, grab the editor when it's ready
  panel.onShown.addListener(function(window) {
    console.log("panel.onShown");
    function onShown() {
      panel_window.purple.show();
    }
    if (!panel_window) { // Then this is the first time we opened the panel       
      panel_window = window;
      panel_window.chrome.devtools = chrome.devtools;
      panel_window.purple.onPanelReady = function() {
        console.log(window.location + ' talking ');

        var disposer =  RESTChannel.talk(panel_window, onAttach);
        window.addEventListener('unload', function unload() {
          disposer();
          window.removeEventListener('unload', unload);
        });
      }
    }
  });

  // use CodeMirror panel to open resources
  chrome.devtools.panels.setOpenResourceHandler(function(resource, line) {
    console.log('open resource', resource, resource.url, resource.type, line);

    resource_cache[resource.url] = resource;

    resource.getContent(function(content, encoding) {
      console.log('encoding', encoding);
      load(resource.url, content, resource.type, line);
    });
    
    panel.show();

  });

  // wire WebInspector search bar to the editor
  panel.onSearch.addListener(function(action, query) {
    console.log('search',action,query);
    if (editor) {
      var cursor = editor.getSearchCursor(query, null, true);
      cursor.findNext();
    }
  });

}