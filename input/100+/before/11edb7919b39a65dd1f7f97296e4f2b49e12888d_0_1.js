function(            ChromeProxy)  {

  var debug = true;
  
  function echoOk() {
    if (debug) {
      console.log('ok ', arguments);
    }
  }
  
  function echoErr() {
    console.error('ERROR ', arguments);
  }

  function Debuggee(iframeDomain) {
    this.iframeDomain = iframeDomain;
  }
  
  Debuggee.prototype = {
    attachToParent: function() {
      console.log(window.location + ' talking ');
      RESTChannel.talk(window.parent, function(atopwi) {
        this.register(atopwi);
        console.log('Debuggee connected', atopwi);
      }.bind(this));
    },
    
    options: function() {
      return {
        put: '{url: string || tabId: number}'
      };
    },
        
    put: function (atopwi, obj) {
      if (obj.url || obj.tabId) {
        this.attachToChrome(obj);
        return {message:'attached'};
      } else {
        var error = "No url or tabId property on debuggee";
        return {message:"Error: "+error, error: error};
      }
    },
    
    register: function(atopwi) {
      atopwi.register(
        'debuggee',
        { options: this.options.bind(this), put: this.put.bind(this) }
      );
    },
  
    attachToChrome: function(debuggeeSpec) {

      this.chromeConnection = getChromeExtensionPipe();
      
      var tid = window.setTimeout(function offerExtension() {
        // TODO
        window.alert('Requires: https://github.com/johnjbarton/crx2app');
      }, 2000);
  
      // listen for a connection.
      this.chromeConnection.attach(
        function onConnectedToChrome() {
          // we have connected to the extension, so clear the offer
          window.clearTimeout(tid);
                
          this.chrome = ChromeProxy.new(
            this.chromeConnection, 
            {
              windows: {}, 
              tabs: { onRemoved: function() { console.log('tab removed');}}
              //debugger event listeners are added during load
            });
          
          
          //this.open(debuggeeSpec);
          this.parseDebuggee(debuggeeSpec);
          this.attach(function() {
              console.log("Debuggee attach ", this.chrome);
              this.chrome.debugger.sendCommand(
                  {tabId: this.tabId}, 
                  "Page.reload",
                  {},
                  function (response) {
                      if (!response) {
                          console.error("Page.reload failed");
                      }
                  }
              );
          }.bind(this));
          
    
        }.bind(this), 
        function errback(msg) {
         console.error('Debuggee.attach ERROR:', msg);
        }
      );
      
      window.beforeUnload = function detach() {
        this.chromeConnection.detach();
      }.bind(this);

    },

    parseDebuggee: function(debuggeeSpec) {
      var tabId = parseInt(debuggeeSpec.tabId, 10);
      if (debuggeeSpec.url) {
        this.url = decodeURIComponent(debuggeeSpec.url);
      }
      if ( !isNaN(tabId) ) {  // then we better have a URL
        this.tabId = tabId;
      }
    },
    
    open: function(debuggeeSpec) {
      this.parseDebuggee(debuggeeSpec);
      if (debug) {
        console.log("Debuggee parsed debuggeeSpec %o and got %o", debuggeeSpec, this);
      }
      var high = window.screen.availHeight;
      var wide = window.screen.availWidth / 2;
      var createData = {
        url: this.url,
        left: wide,
        width: wide,
        height: high,
        focused: false
      };
        
      this.chrome.openNewTab(
        createData, 
        function(newTabId) {
          this.tabId = newTabId;
          window.beforeUnload = this.close.bind(this);
          this.attach();
        }.bind(this)
      );
    },
    
    close: function(newTabId) {
      this.chrome.tabs.remove(newTabId, function() {
        if (debug) {
          console.log('atopwi removed '+newTabId);
        }
      });
    },

    attach: function(callback) {
      this.chrome.debugger.attach(
        {tabId: this.tabId}, 
        '1.0', 
        this.onAttach.bind(this, callback)
      );
    },
    
    onAttach: function(callback) {
      if (debug) {
        console.log('atopwi chrome.debugger.attach complete '+this.tabId);
      }
       
      window.beforeUnload = this.detach.bind(this);
        
      this.patchInspector(callback);
    },
    
    detach: function() {
      this.chrome.debugger.detach({tabId: this.tabId}, function() {
         if (debug) {
            console.log('atopwi detached from ' + this.tabId);
          }
         this.close(this.tabId);
       }.bind(this));
    },

    patchInspector: function(callback) {
      if (debug) {
        console.log("DOMContentLoaded on inspectorWindow ", this);
      }
      this.inspectorWindow = window;
      
      // Accept command from WebInspector and forward them to chrome.debugger
      var backend = this.inspectorWindow.InspectorBackend;
      backend.sendMessageObjectToBackend = this.sendMessageObject.bind(this);
      
      // Route events from chrome.debugger to WebInspector
      this.chrome.jsonHandlers['chrome.debugger.remote'] = {
        jsonObjectHandler:  function(data) {
          if (debug) {
            console.log("jsonObjectHandler "+data.method, data);
          }
          backend.dispatch.apply(backend, [data]);
        }.bind(this)
      };
    
      this.inspectorWindow.InspectorFrontendHost.sendMessageToBackend = function() {
        throw new Error("Should not be called");
      };

      var WebInspector = this.inspectorWindow.WebInspector;
      WebInspector.attached = true; // small icons for embed in orion
      
      this.completeLoad = WebInspector.delayLoaded; // set by openInspector
    
      // Called asynchronously from WebInspector _initializeCapability
      // which is called byt the load event vai doLoadedDone()
      this._doLoadedDoneWithCapabilities = 
        WebInspector._doLoadedDoneWithCapabilities;
    
      WebInspector._doLoadedDoneWithCapabilities = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        this._doLoadedDoneWithCapabilities.apply(WebInspector, args);
        this.loadExtensions();
        this.navigateToURL();
      }.bind(this);
      this.completeLoad.call(this.inspectorWindow.WebInspector);
      callback && callback();
    },
    
    // When called as a WebApp, devtools extensions are loaded.
    loadExtensions: function() {
      var optionsString = window.localStorage.getItem('options');
      if (optionsString) {
        var options = JSON.parse(optionsString);
        if (options.extensionInfos && options.extensionInfos.length) {
          WebInspector.addExtensions(options.extensionInfos);
        }
      }
      this.navigateToURL();
    },
    
    _eventListenersByDomain: {},
    
    navigateToURL: function(inspectorReady) {
      if (this.url) { // then we started in a new tab, navigate
        if (debug) {
          console.log('atopwi setting URL:'+this.url);
        }
        this.chrome.tabs.update(
          this.tabId, 
          {url: this.url}, 
          this.onTabUpdate.bind(this)
        );
      }
    },
    
    onTabUpdate: function(tab) {
      if (debug) {
        var msg = 'atopwi.chrome.tabs.update ' + this.tabId;
        msg += ' to ' + this.url;
        console.log(msg);
      }
    },
    
    sendMessageObject: function(messageObject) {
      if (debug) {
        var from = messageObject.id ? messageObject.id + ' from devtools ' : '';
        from += messageObject.requestId ? messageObject.requestId + ' from extension ' : '';
        
        console.log(from +" atopwi sendCommand "+messageObject.method);
      }
      
      // The socket protocol sends 'id' and the backend echoes it,
      // so we save it for the response
      function handleSendCommandResponse(id, data) {
        var response = {result: data, id: id};
        if (chrome.extension.lastError) {
            response.error = chrome.extension.lastError;
        }
        if (debug) {
          var msg = id + 
             " atopwi response to sendCommand " + messageObject.method;
             var obj = {messageObject: messageObject, data: data, response: response};
             console.log(msg, obj);
        }
        this.inspectorWindow.InspectorBackend.dispatch(response); 
      }
      
      this.chrome.debugger.sendCommand(
        {url: this.url, tabId: this.tabId}, 
        messageObject.method, 
        messageObject.params, 
        handleSendCommandResponse.bind(this, messageObject.id)
      );
    }
    
};

return Debuggee;

}