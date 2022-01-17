function(template) {
                if (typeof view.context === 'object') {
                    return template.call(view, view.context, setHtml);
                } else if (typeof view.context === 'undefined') {
                    return template.call(view, {}, setHtml);
                } else if (typeof view.context === 'function') {
                    var callback = function (context) {
                        template.call(view, context, setHtml);
                    };

                    var args2 = Array.prototype.slice.call(args);
                    args2.unshift(callback);
                    view.context.apply(view, args2);
                }
            }