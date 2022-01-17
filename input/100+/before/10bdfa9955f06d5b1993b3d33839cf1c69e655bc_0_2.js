function(facet_model){
            // This function assembles two sets of queries:
            // The inner query selects a data set, and optionally groups it.
            // That query uses the filters.
            // In some cases we will make separate queries for base filters, and for primary filters.
            // The outer query does a secondary grouping and aggregation.
            // This allows us to do things like:
            // 'select sum(dataset.xy) group by dataset.category from
            // (select data.x * data.y where data.x > 7 group by data.category) as dataset

            // Initialize the inner query.
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
            var key = facet_model.get('KEY');
            var qfield  = facet_model.get('quantity_field');

            // Get the quantity field's inner query parameters.
            inner_q['SELECT'].push(qfield.get('inner_query_entity'));
            _.each(qfield.get('inner_query_group_by'), function(gb){
                inner_q['GROUP_BY'].push(gb);
            });
            _.each(qfield.get('inner_query_from'), function(frm){
                inner_q['FROM'].push(frm);
            });

            // Get the facet's inner query parameters.
            var primary_filters = this._filterObjectGroupsToArray(facet_model.get('primary_filters'));
            var base_filters = this._filterObjectGroupsToArray(facet_model.get('base_filters'));
            var combined_filters = primary_filters.concat(base_filters);
            _.each(combined_filters, function(f){
                inner_q['WHERE'].push(f);
            });
            inner_q['GROUP_BY'].push(key['KEY_ENTITY']);
            inner_q['GROUP_BY'].push(key['LABEL_ENTITY']);

            // Initialize the outer query.
            var outer_q = {
                'ID': 'outer',
                'SELECT_GROUP_BY': true,
                'SELECT': [],
                'FROM': [{'ID': 'inner', 'TABLE': inner_q}],
                'WHERE': [],
                'GROUP_BY': [],
                'ORDER_BY': []
            };

            // Add the quantity field's outer query parameters.
            outer_q['SELECT'].push(qfield.get('outer_query_entity'));
            _.each(['KEY_ENTITY', 'LABEL_ENTITY'], function(attr){
                outer_q['GROUP_BY'].push({
                    'ID': key[attr]['ID'],
                    'EXPRESSION': _s.sprintf("{{inner.%s}}", key[attr]['ID'])
                });
            });

            // Assemble the keyed result parameters.
            var keyed_results_parameters = {
                "KEY": key,
                "QUERIES": [outer_q]
            };

            // Assemble keyed query request.
            keyed_query_request = {
                'ID': 'keyed_results',
                'REQUEST': 'execute_keyed_queries',
                'PARAMETERS': keyed_results_parameters
            };

            return keyed_query_request;
        }