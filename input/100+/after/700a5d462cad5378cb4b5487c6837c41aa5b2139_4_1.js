function(templates) {
            for (var c = 0; c < templates.length; c++) {
                var category = templates[c];
                var refId = sakai.api.Util.generateWidgetId();
                var title = sakai.api.i18n.getValueForKey(category.titlePlural);
                pubdata.structure0[category.id] = {
                    '_title': title,
                    '_ref': refId,
                    '_order': (c + worldsOrderIncrement),
                    '_url': searchUrl,
                    'main': {
                        '_ref': refId,
                        '_order': 0,
                        '_title': title,
                        '_url': searchUrl
                    }
                };
                var searchWidgetId = sakai.api.Util.generateWidgetId();
                pubdata[refId] = {
                    'rows': [
                        {
                            'id': sakai.api.Util.generateWidgetId(),
                            'columns': [
                                {
                                    'width': 1,
                                    'elements': [
                                        {
                                            'id': searchWidgetId,
                                            'type': 'searchgroups'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
                pubdata[refId][searchWidgetId] = {
                    'category': category.id
                };
            }
        }