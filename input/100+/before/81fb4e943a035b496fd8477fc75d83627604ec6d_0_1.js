function (content) {
        // let's build a function that wrap all that stuff into what is needed
        // for the new completer:
        var matched_text = content.matched_text;
        var matches = content.matches;

        var cur = this.editor.getCursor();
        var results = CodeMirror.contextHint(this.editor);

        // append the introspection result, in order, at at the beginning of
        // the table and compute the replacement range from current cursor
        // positon and matched_text length.
        for (var i = matches.length - 1; i >= 0; --i) {
            results.unshift({
                str: matches[i],
                type: "introspection",
                from: {
                    line: cur.line,
                    ch: cur.ch - matched_text.length
                },
                to: {
                    line: cur.line,
                    ch: cur.ch
                }
            });
        }

        // one the 2 sources results have been merge, deal with it
        this.raw_result = results;

        // if empty result return
        if (!this.raw_result || !this.raw_result.length) return;

        // When there is only one completion, use it directly.
        if (this.autopick == true && this.raw_result.length == 1) {
            this.insert(this.raw_result[0]);
            return;
        }

        if (this.raw_result.length == 1) {
            // test if first and only completion totally matches
            // what is typed, in this case dismiss
            var str = this.raw_result[0].str;
            var pre_cursor = this.editor.getRange({
                line: cur.line,
                ch: cur.ch - str.length
            }, cur);
            if (pre_cursor == str) {
                this.close();
                return;
            }
        }

        this.complete = $('<div/>').addClass('completions');
        this.complete.attr('id', 'complete');

        this.sel = $('<select/>').attr('multiple', 'true').attr('size', Math.min(10, this.raw_result.length));
        var pos = this.editor.cursorCoords();

        // TODO: I propose to remove enough horizontal pixel
        // to align the text later
        this.complete.css('left', pos.x + 'px');
        this.complete.css('top', pos.yBot + 'px');
        this.complete.append(this.sel);

        $('body').append(this.complete);
        //build the container
        var that = this;
        this.sel.dblclick(function () {
            that.pick();
        });
        this.sel.blur(this.close);
        this.sel.keydown(function (event) {
            that.keydown(event);
        });

        this.build_gui_list(this.raw_result);

        this.sel.focus();
        // Opera sometimes ignores focusing a freshly created node
        if (window.opera) setTimeout(function () {
            if (!this.done) this.sel.focus();
        }, 100);
        return true;
    }