function(){
                                var filters = _.clone(model.get('filters')) || {};
                                filters[filter_group_id] = filter_group.getFilters();
                                model.set('query_filters', filters);
                            }