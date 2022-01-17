function(facet_model, key, include_filter_attrs){
            // Set include filters to primary and base by default.
            include_filter_attrs = include_filter_attrs || ['primary_filters', 'base_filters'];

            // Initialize query definition.
            // Note: 'ID' must be 'inner' to conform to conventions.
            var inner_q = {
                'ID': 'inner',
                'SELECT_GROUP_BY': true,
                'SELECT': [],
                'FROM': [],
                'WHERE': [],
                'GROUP_BY': [],
                'ORDER_BY': []
            };

            // Shortcuts.
            var qfield  = facet_model.get('quantity_field');

            // Get the quantity field's inner query parameters.
            inner_q['SELECT'].push(qfield.get('inner_query_entity'));
            _.each(qfield.get('inner_query_group_by'), function(gb){
                inner_q['GROUP_BY'].push(gb);
            });
            _.each(qfield.get('inner_query_from'), function(frm){
                inner_q['FROM'].push(frm);
            });

            // Get the facet's inner query filters.
            var _this = this;
            _.each(include_filter_attrs, function(include_filter_attr){
                facet_filters = facet_model.get(include_filter_attr);
                filter_array = _this._filterObjectGroupsToArray(facet_filters);
                _.each(filter_array, function(f){
                    inner_q['WHERE'].push(f);
                });
            });

            // Get the facet's inner query group by paramters.
            inner_q['GROUP_BY'].push(key['KEY_ENTITY']);
            if (key['LABEL_ENTITY']){
                inner_q['GROUP_BY'].push(key['LABEL_ENTITY']);
            }

            return inner_q;
        }