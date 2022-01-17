function(navData){

            toplevelId = navData.id;

            pubdata = {
                "structure0": {}
            };
            privdata = {
                "structure0": {}
            };

            var rnd =  sakai.api.Util.generateWidgetId();
            privdata["structure0"][navData.id] = {
                "_order": 0,
                "_ref": rnd,
                "_title": navData.title
            };

            // featuredcontent, featured people and featuredworld random numbers
            var fcRnd = sakai.api.Util.generateWidgetId();
            var fpRnd = sakai.api.Util.generateWidgetId();
            var fwRnd = sakai.api.Util.generateWidgetId();
            privdata[rnd] = {
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
            privdata[rnd][fcRnd] = {
                category: navData.id,
                title: navData.title
            };
            privdata[rnd][fpRnd] = {
                category: navData.id,
                title: navData.title
            };
            privdata[rnd][fwRnd] = {
                category: navData.id,
                title: navData.title
            };

            var count = 0;
            if (navData.children) {
                $.each(navData.children, function(index, item) {
                    var rnd = sakai.api.Util.generateWidgetId();
                    pubdata['structure0'][navData.id + '-' + index] = {
                        '_ref': rnd,
                        '_order': count,
                        '_title': item.title,
                        'main': {
                            '_ref': rnd,
                            '_order': 0,
                            '_title': item.title
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
                                'elements': [{
                                    'id': fcRnd,
                                    'type': 'featuredcontent'
                                }, {
                                    'id': fpRnd,
                                    'type': 'featuredpeople'
                                }, {
                                    'id': fwRnd,
                                    'type': 'featuredworlds'
                                }]
                            }]
                        }]
                    };
                    pubdata[rnd][fcRnd] = {
                        category: navData.id + '-' + index,
                        title: navData.title + ' » ' + item.title
                    };
                    pubdata[rnd][fpRnd] = {
                        category: navData.id + '-' + index,
                        title: navData.title + ' » ' + item.title
                    };
                    pubdata[rnd][fwRnd] = {
                        category: navData.id + '-' + index,
                        title: navData.title + ' » ' + item.title
                    };

                    count++;
                });
            }
            $(window).trigger("lhnav.init", [pubdata, privdata, {}]);
        }