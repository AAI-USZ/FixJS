function(json) {
                if (json.error) {
                    if ($.isArray(json.error)) {
                        $.each(json.error, function() {
                            $.nosNotify(this, 'error');
                        });
                    } else {
                        $.nosNotify(json.error, 'error');
                    }
                }
                if (json.internal_server_error) {
                    var ise = json.internal_server_error;
                    var str = "An internal server error has been detected.\n\n";
                    str +=  ise.type + ' [ ' + ise.severity + ' ]: ' + ise.message + "\n";
                    str += ise.filepath + " @ line " + ise.error_line + "\n\n";
                    str += "Backtrace:\n";
                    for (var i = 0; i < ise.backtrace.length; i++) {
                        str += (i + 1) + ': ' + ise.backtrace[i].file + ' @ line ' + ise.backtrace[i].line + "\n";
                    }
                    if (console) {
                        console.error(str);
                    }
                }
                if (json.notify) {
                    if ($.isArray(json.notify)) {
                        $.each(json.notify, function() {
                            $.nosNotify(this);
                        });
                    } else {
                        $.nosNotify(json.notify);
                    }
                }
                // Call user callback
                if ($.isFunction(json.user_success)) {
                    json.user_success.apply(this, args);
                }

                var dialog = this.closest('.ui-dialog-content').size();
                if (dialog) {
                    if (json.closeTab) {
                        this.nosTabs('close');
                    }
                } else {
                    if (json.redirect) {
                        document.location.href = json.redirect;
                    }
                    if (json.replaceTab) {
                        this.nosTabs('update', {
                            url : json.replaceTab,
                            reload : true
                        });
                    }
                }
                if (json.dispatchEvent) {
                    var events = json.dispatchEvent;
                    if (!$.isArray(events)) {
                        events = [events];
                    }
                    $.each(events, function(i, event) {
                        $.nosDispatchEvent(event);
                    });
                }

                return this;
            }