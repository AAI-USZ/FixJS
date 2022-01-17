function(){
                    var base_filters = _.clone(q.get('base_filters')) || {};
                    base_filters[filter_group_id] = filter_groups[filter_group_id].getFilters();
                    q.set('base_filters', base_filters);
                }