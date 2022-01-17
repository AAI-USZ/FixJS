function() {
            for (var i = 0; i < sakai.config.worldTemplates.length; i++) {
                var category = sakai.config.worldTemplates[i];
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
        }