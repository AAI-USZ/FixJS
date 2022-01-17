function(success, templates) {
            if (success) {
                for (var i = 0; i < templates.length; i++) {
                    var category = templates[i];
                    var rnd = sakai.api.Util.generateWidgetId();
                    pubdata.structure0[category.id] = {
                        '_order': i,
                        '_title': sakai.api.i18n.getValueForKey(category.title),
                        '_ref': rnd
                    };
                    pubdata[rnd] = {
                        'rows': [{
                            'id': sakai.api.Util.generateWidgetId(),
                            'columns': [{
                                'width': 1,
                                'elements': [
                                    {
                                        'id': category.id,
                                        'type': 'selecttemplate'
                                    }
                                ]
                            }]
                        }]
                    };
                }
            } else {
                debug.error('Could not get the group templates');
            }
        }