function () {
            var pieces = [];
            pieces.push(this.get('name').concat("=", encodeURIComponent(this.get('value'))));
            if (this.get('days')) {
                var date = new Date();
                date.setTime(date.getTime()+(this.get('days')*24*60*60*1000));
                pieces.push("expires".concat('=',date.toGMTString()));
            }
            if (this.get('path')) {
                pieces.push("path".concat('=', this.get('path')));
            }
            if (this.get('domain')) {
                pieces.push("domain".concat('=', this.get('domain')));
            }
            if (this.get('secure')) {
                pieces.push("secure");
            }
            document.cookie = pieces.join('; ');
        }