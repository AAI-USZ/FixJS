function(callback) {
            if (!sakai_conf.worldTemplates) {
                var templates = [];
                $.ajax({
                    url: sakai_conf.URL.WORLD_INFO_URL,
                    success: function(data) {
                        data = sakai_serv.removeServerCreatedObjects(data, ["jcr:"]);
                        $.each(data, function(key, value){
                            if ($.isPlainObject(value) && value.id){
                                templates.push(value);
                            }
                        });
                        $.each(templates, function(i,temp) {
                            $.each(temp, function(k,templ) {
                                if ($.isPlainObject(temp[k])) {
                                    temp.templates = temp.templates || [];
                                    temp.templates.push(temp[k]);
                                }
                            });
                        });
                        templates = _.sortBy(templates, function(templ) {
                            return templ.order;
                        });
                        sakai_conf.worldTemplates = templates;
                        if ($.isFunction(callback)) {
                            callback();
                        }
                    }
                });
            } else {
                if ($.isFunction(callback)) {
                    callback();
                }
            }
        }