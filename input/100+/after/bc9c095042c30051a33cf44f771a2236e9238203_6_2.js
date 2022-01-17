function(cat, id, callback) {
            sakai_util.getTemplates(function(success, templates) {
                if (success) {
                    var category = false;
                    for (var i = 0; i < templates.length; i++) {
                        if (templates[i].id === cat) {
                            category = templates[i];
                            break;
                        }
                    }
                    var template = false;
                    if (category && category.templates && category.templates.length) {
                        for (var w = 0; w < category.templates.length; w++) {
                            if (category.templates[w].id === id) {
                                template = category.templates[w];
                                break;
                            }
                        }
                    }
                    if ($.isFunction(callback)) {
                        callback(success, template, templates);
                    }
                } else {
                    debug.error('Could not get the template for ' + id);
                    if ($.isFunction(callback)) {
                        callback(false);
                    }
                }
            });
        }