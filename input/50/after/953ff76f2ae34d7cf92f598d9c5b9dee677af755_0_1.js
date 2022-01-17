function() {
            var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
            var document = mediator.getMostRecentWindow('navigator:browser').document;      
            var navBar = document.getElementById('toolbar-button');
            popupPanel.show(navBar);
        }