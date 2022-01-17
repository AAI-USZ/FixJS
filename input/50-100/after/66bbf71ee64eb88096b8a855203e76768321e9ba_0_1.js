function(filter_group_id){
                var filter_group = this.filter_groups[filter_group_id];
                filter_group.on('change:filters', function(){
                    var filters = _.clone(q.get('query_filters')) || {};
                    filters[filter_group_id] = filter_group.getFilters();
                    q.set('query_filters', filters);
                });
            }