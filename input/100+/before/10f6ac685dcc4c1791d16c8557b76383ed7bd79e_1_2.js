function(index, item){
                var rnd = sakai.api.Util.generateWidgetId();
                pubdata["structure0"][navData.id + "-" + index] = {
                    "_ref": rnd,
                    "_order": count,
                    "_title": item.title,
                    "main": {
                        "_ref": rnd,
                        "_order": 0,
                        "_title": item.title
                    }
                };

                // featuredcontent, featured people and featuredworld random numbers
                var fcRnd = sakai.api.Util.generateWidgetId();
                var fpRnd = sakai.api.Util.generateWidgetId();
                var fwRnd = sakai.api.Util.generateWidgetId();
                pubdata[rnd] = {
                    'rows': [{
                        'id': sakai.api.Util.generateWidgetId(),
                        'columns': [{
                            'width': 1,
                            'elements': [
                                {
                                    'id': fcRnd,
                                    'type': 'featuredcontent'
                                },
                                {
                                    'id': fpRnd,
                                    'type': 'featuredpeople'
                                },
                                {
                                    'id': fwRnd,
                                    'type': 'featuredworlds'
                                }
                            ]
                        }]
                    }]
                };
                pubdata[rnd][fcRnd] = {
                    category: navData.id + "-" + index,
                    title: navData.title + " » " + item.title
                };
                pubdata[rnd][fpRnd] = {
                    category: navData.id + "-" + index,
                    title: navData.title + " » " + item.title
                };
                pubdata[rnd][fwRnd] = {
                    category: navData.id + "-" + index,
                    title: navData.title + " » " + item.title
                };

                count++;
            }