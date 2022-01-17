function () {
        var _this = this,
            arrayLink = document.getElementsByTagName('link'),
            arrayLinkLength = arrayLink.length,
            linkItem;

        for (var i = 0; i < arrayLinkLength; i++) {
            linkItem = arrayLink[i];
            if (linkItem.getAttribute('href').indexOf('.css') > -1 && linkItem.getAttribute('cssWatch') != 'no') {
                _this.arrayCssFiles.push(linkItem.getAttribute('href'));
                _this.arrayCssObj.push(linkItem);
            }
        }

        if (_this.arrayCssFiles.length > 0) {
            this.loadCss();
        }
    }