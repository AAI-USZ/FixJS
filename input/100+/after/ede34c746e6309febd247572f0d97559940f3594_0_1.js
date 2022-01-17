function(model, key, filter_attrs){
            // Set include filters to primary and base by default.
            filter_attrs = filter_attrs || ['primary_filters', 'base_filters'];

            // Shortcuts.
            var qfield  = model.get('quantity_field');

            // Initialize query definition.
            // Note: 'ID' must be 'inner' to conform to conventions.
            var inner_q = {
                'ID': 'inner',
                'SELECT_GROUP_BY': true,
                'GROUP_BY': []
            };

            // Merge the quantity field's inner query parameters.
            this.extendQuery(inner_q, qfield.get('inner_query'));

            // Add the facet's filters.
            this.addFiltersToQuery(model, filter_attrs, inner_q);

            // Add the facet's key entities as group_by paramters.
            inner_q['GROUP_BY'].push(key['KEY_ENTITY']);
            if (key['LABEL_ENTITY']){
                inner_q['GROUP_BY'].push(key['LABEL_ENTITY']);
            }

            return inner_q;
        }