function AutoHeight(selector, option) {
        var self = this,
            $obj = $(selector),
            obj = $obj[0],
            nodeName = obj && obj.nodeName.toLowerCase(),
            timer,
            $iframe;
        if (!obj) {
            return;
        }

        if (nodeName === 'iframe') {
            $iframe = $obj;
            var win = obj.contentWindow || obj.contentDocument && obj.contentDocument.defaultView,
                doc = win.document,
                oldHtml = $(doc.body).html();
            if (doc.designMode.toLowerCase() !== 'on') {
                doc.designMode = 'on';
                // must do this or doc.body is null
                doc.open();
                doc.writeln(oldHtml);
                doc.close();
            }

            $obj = $('body', doc);
            // if no children
            if ($obj.children().length === 0) {
                $('<div></div>', doc).appendTo($obj);
                // throw error on IE6
            }
            self.doc = doc;
            self._isIFrame = true;
        } else if (nodeName !== 'textarea') {
            return;
        }

        self.$obj = $obj;
        self.$iframe = $iframe;

        var adjustHeight,
            opt = {
                blankHeight: 0,
                // maxHeight: 
                minHeight: self._isIFrame ?  $iframe.height() : $obj.height()
            };
        self.oldHeight = opt.minHeight;
        $.extend(opt, option);
        self.maxHeight = opt.maxHeight;
        self.minHeight = opt.minHeight;
        self.blankHeight = opt.blankHeight;

        if (self._isIFrame) {
            // because of image flash load, so have to use setTimeout;
            adjustHeight = function() {
                self.adjustHeight();
                setTimeout(adjustHeight, 50);
            };
            adjustHeight();
        } else {
            adjustHeight = function() {
                self.adjustHeight();
            };

            adjustHeight();
            $obj.bind('paste.gkAutoHeight cut.gkAutoHeight mouseup.gkAutoHeight keydown.gkAutoHeight keyup.gkAutoHeight dragover.gkAutoHeight drop.gkAutoHeight', function() {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(adjustHeight, 50);
            });
        }
    }