function () {
        var _this = this,
            arrayLink = document.getElementsByTagName('link'),
            arrayLinkLength = arrayLink.length,
            linkItem;

        for (var i = 0; i < arrayLinkLength; i++) {
            linkItem = arrayLink[i];
            if (linkItem.getAttribute('href').substr(-4) == '.css' && linkItem.getAttribute('cssWatch') != 'no') {
                _this.arrayCssFiles[_this.arrayCssFiles.length] = linkItem.getAttribute('href');
                _this.arrayCssObj[_this.arrayCssFiles.length - 1] = linkItem;
            }
        }

        if (_this.arrayCssFiles.length > 0) {
            this.loadCss();
        }
    }