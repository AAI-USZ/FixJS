function () {
            var regex = new RegExp(chrome.extension.getURL(this.application.ninja.currentDocument.model.views.design.iframe.src.split(chrome.extension.getURL('/'))[1]).replace(/\//gi, '\\\/'), 'gi');
            return regex;
        }