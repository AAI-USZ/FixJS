function(){
                                var filters = _.clone(model.get('query_filters')) || {};
                                filters[filter_group_id] = filter_group.getFilters();
                                model.set('query_filters', filters);
                            }