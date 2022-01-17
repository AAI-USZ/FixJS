function(options, callbacks) {
    if ( (options.loadReason != 'startup' && options.loadReason !== undefined) ||
         (require('self').loadReason != 'startup') ) {
        if (browserSearchService.getEngineByName('DuckDuckGo') === null) {
            browserSearchService.addEngine(data.url('search.xml'), 1, data.url('img/icon_16.png'), true);
            // it's 1 (because of magic and you need to read the Firefox code
            // to understand it)
        }

    }

    console.log(JSON.stringify(options, null, ' '));
    startup(null, null);
  // Create a new context menu item.
    var menuItem = contextMenu.Item({
 
    label: "Ask the duck",
    // Show this item when a selection exists.
 
    context: contextMenu.SelectionContext(),
 
    // When this item is clicked, post a message to the item with the
    // selected text and current URL.
    contentScript: 'self.on("context", function () {' +
                   '  var input = window.getSelection().toString();' +
                   '  self.postMessage(input); ' +
                   '  return "Ask the duck"; ' +
                   '});' + 
                   'self.on("click", function(){ ' +
                   '  var input = window.getSelection().toString();' +
                   '  window.location.href = "https://duckduckgo.com/" + input;' +
                   '});' ,
    onMessage: function(msg){
            res = result(msg);
            if (res !== null && res[0] !== '' && res[0] !== undefined) {
              //var x = '';
              //if (res[0].length > 40) {
              //    console.log(res[0]);
              //    x = res[0].substr(40, res[0].length)
              //    res[0] = res[0].substr(0, 40);

              //    this.label = res[0];
              //    menuItemSecond.label = x;
              //} else {
              //    this.label = res[0];
              //    menuItemSecond.label = ' ';
              //}
                this.label = res[0];
                this.image = res[1];
            } else {
                this.image = null;
                this.label = 'Ask the duck';
            }
        }
    });

  //var menuItemSecond = contextMenu.Item({
  //    label: 'second',
  //    context: contextMenu.SelectionContext()
  //});

    var btn = require("toolbarbutton").ToolbarButton({
        id: 'toolbar-button',
        label: 'DuckDuckGo Popup Panel',
        image: data.url('img/icon_16.png'),
        onCommand: function() {
            var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
            var document = mediator.getMostRecentWindow('navigator:browser').document;      
            var navBar = document.getElementById('toolbar-button');
            popupPanel.show(navBar);
        }
    });
    
    btn.moveTo({
      toolbarID: "nav-bar",
      forceMove: false // only move from palette
    });
}