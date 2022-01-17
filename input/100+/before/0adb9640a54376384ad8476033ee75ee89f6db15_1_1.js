function(template) {
                var html = null;
                if (typeof view.context === 'object') {
                    html = template.call(view, view.context);
                } else if (typeof view.context === 'undefined') {
                    html = template.call(view);
                }

                if (html !== null) {
                    setHtml(html);
                } else if (typeof view.context === 'function') {
                    var callback = function(context) {
                        var html = template.call(view, context);
                        setHtml(html);
                    };

                    var args2 = Array.prototype.slice.call(args);
                    args2.unshift(callback);
                    view.context.apply(view, args2);
                }
            }