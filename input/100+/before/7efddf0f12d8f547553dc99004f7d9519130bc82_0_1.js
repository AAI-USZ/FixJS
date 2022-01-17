function AutoHeight(selector, option) {
        var self = this,
            $obj = $(selector),
            obj = $obj[0],
            nodeName = obj && obj.nodeName.toLowerCase(),
            timer,
            $iframe;

        if (nodeName === 'iframe') {
            $iframe = $obj;
            var win = obj.contentWindow || obj.contentDocument && obj.contentDocument.defaultView,
                doc = win.document,
                oldHtml = $(doc.body).html();
            if (doc.designMode !== 'on') {
                doc.designMode = 'on';
                // must do this or doc.body is null
                doc.open();
                doc.writeln(oldHtml);
                doc.close();
            }

            $obj = $('body', doc);
            // if no children
            if ($obj.children().length === 0) {
                $('<br/>', doc).appendTo($obj);
                // throw error on IE6
            }
            self.doc = doc;
            self._isIFrame = true;
        } else if (nodeName !== 'textarea') {
            return this;
        }

        self.$obj = $obj;
        self.$iframe = $iframe;

        var opt = {
                blankHeight: 0,
                // maxHeight: 
                minHeight: self._isIFrame ?  $iframe.height() : $obj.height()
            };
        self.oldHeight = opt.minHeight;
        $.extend(opt, option);
        self.maxHeight = opt.maxHeight;
        self.minHeight = opt.minHeight;
        self.blankHeight = opt.blankHeight;

        function adjustHeight() {
            self.adjustHeight();
        }
        adjustHeight();
        $obj.bind('paste.gkAutoHeight cut.gkAutoHeight mouseup.gkAutoHeight keyup.gkAutoHeight dragover.gkAutoHeight drop.gkAutoHeight', function() {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(adjustHeight, 50);
        });
    }