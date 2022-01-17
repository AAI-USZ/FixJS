function(callback) {
            if (!sakai_util.data.worldTemplates) {
                sakai_util.data.worldTemplates = [];
                $.ajax({
                    url: sakai_conf.URL.WORLD_INFO_URL,
                    success: function(data) {
                        data = sakai_serv.removeServerCreatedObjects(data, ['jcr:']);
                        $.each(data, function(key, value) {
                            if ($.isPlainObject(value) && value.id) {
                                sakai_util.data.worldTemplates.push(value);
                            }
                        });
                        $.each(sakai_util.data.worldTemplates, function(i, temp) {
                            $.each(temp, function(k, templ) {
                                if ($.isPlainObject(temp[k])) {
                                    temp.templates = temp.templates || [];
                                    temp.templates.push(temp[k]);
                                }
                            });
                        });
                        sakai_util.data.worldTemplates = _.sortBy(sakai_util.data.worldTemplates, function(templ) {
                            return templ.order;
                        });
                        if ($.isFunction(callback)) {
                            callback(true, sakai_util.data.worldTemplates);
                        }
                    }, error: function(xhr, textStatus, thrownError) {
                        debug.error('Could not get the group templates');
                        if ($.isFunction(callback)) {
                            callback(false, xhr);
                        }
                    }
                });
            } else {
                if ($.isFunction(callback)) {
                    callback(true, sakai_util.data.worldTemplates);
                }
            }
        }