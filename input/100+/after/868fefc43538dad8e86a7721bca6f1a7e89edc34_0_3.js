function(facet_model, include_filter_attrs){
            // This function assembles two sets of queries:
            // The inner query selects a data set, and optionally groups it.
            // That query uses the filters.
            // In some cases we will make separate queries for base filters, and for primary filters.
            // The outer query does a secondary grouping and aggregation.
            // This allows us to do things like:
            // 'select sum(dataset.xy) group by dataset.category from
            // (select data.x * data.y where data.x > 7 group by data.category) as dataset

            // Shortcuts.
            var qfield  = facet_model.get('quantity_field');

            // Copy the key entity.
            var key = JSON.parse(JSON.stringify(facet_model.get('KEY')));

            // Get the inner query.
            var inner_q = this.makeFacetInnerQuery(facet_model, key, include_filter_attrs);

            // Get the outer query.
            var outer_q = this.makeFacetOuterQuery(facet_model, key, inner_q, 'outer');

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