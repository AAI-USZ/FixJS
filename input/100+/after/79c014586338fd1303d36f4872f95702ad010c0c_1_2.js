function(tabId, oncomplete) {
        if (tabId == MY_TAB_ID) {
            dbg("fake port backchannel");
            // fake port needs to be set up, chrome f*cks up allow port connections within the same window
            var port = new FakePort('backchannel', MY_TAB_ID);
            port.local.onMessage.addListener(function(msg) {processCommands(msg, port.local)});
            backchannel = port.local;
            backchannel_script(port.remote);
            setTimeout(oncomplete, 500);
        } else {
            chrome.tabs.executeScript(tabId, 
                {'code': '(function(){var __p=chrome.extension.connect({name:"backchannel"});('+backchannel_script.toString()+')(__p);})();'}
                    ,function() {setTimeout(oncomplete, 500)});
        }
    }