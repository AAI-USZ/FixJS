function (text, text2) {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    lastModified = /Last-Modified[]?:([^\n]+)/ig.exec(request.getAllResponseHeaders());
                    lastModified = lastModified[1];

                    _this.arrayCssObj[_this.counter].setAttribute('href', _this.arrayCssFiles[_this.counter] + '?_=' + Math.random());
                    if (lastModified) {
                        _this.arrayLastModified[_this.counter] = lastModified.replace(/^\s+/, '').replace(/\s+$/, '');
                    }
                }

                setTimeout(function () {
                    if (_this.counter < _this.arrayCssObj.length - 1) {
                        _this.counter++;
                        _this.loadCss();
                    } else {
                        _this.counter = 0;
                        _this.loadCss();
                    }
                },_this.updateInterval);
           }
        }