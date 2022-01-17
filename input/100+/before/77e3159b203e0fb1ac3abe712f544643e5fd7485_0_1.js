function() {
            this.html5_upload = {
                xhr:                    new XMLHttpRequest(),
                continue_after_abort:    true
            };
            if (options.autostart) {
                $(this).bind('change', upload);
            }
            for (event in available_events) {
                if (options[available_events[event]]) {
                    $(this).bind("html5_upload."+available_events[event], options[available_events[event]]);
                }
            }
            $(this)
                .bind('html5_upload.start', upload)
                .bind('html5_upload.cancelOne', function() {
                    this.html5_upload['xhr'].abort();
                })
                .bind('html5_upload.cancelAll', function() {
                    this.html5_upload['continue_after_abort'] = false;
                    this.html5_upload['xhr'].abort();
                })
                .bind('html5_upload.destroy', function() {
                    this.html5_upload['continue_after_abort'] = false;
                    this.xhr.abort();
                    delete this.html5_upload;
                    $(this).unbind('html5_upload.*').unbind('change', upload);
                });
        }