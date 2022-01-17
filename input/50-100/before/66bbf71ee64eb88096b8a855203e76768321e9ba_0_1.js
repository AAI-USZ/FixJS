function(){
                    var filters = _.clone(q.get('filters')) || {};
                    filters[filter_group_id] = filter_groups[filter_group_id].getFilters();
                    q.set('query_filters', filters);
                }