function(facet_model, key, inner_query, query_id){

            // Shortcuts.
            var qfield  = facet_model.get('quantity_field');

            // Initialize the outer query.
            var outer_q = {
                'ID': query_id || 'outer',
                'SELECT': [],
                'FROM': [{'ID': 'inner', 'TABLE': inner_query}],
                'WHERE': [],
                'GROUP_BY': [],
                'ORDER_BY': [],
                'SELECT_GROUP_BY': true,
            };

            // Add the quantity field's outer query parameters.
            outer_q['SELECT'].push(qfield.get('outer_query_entity'));
            gb_attrs = ['KEY_ENTITY'];
            if (key['LABEL_ENTITY']){
                gb_attrs.push('LABEL_ENTITY');
            }
            _.each(gb_attrs, function(attr){
                outer_q['GROUP_BY'].push({
                    'ID': key[attr]['ID'],
                    'EXPRESSION': _s.sprintf("{{inner.%s}}", key[attr]['ID'])
                });
            });

            return outer_q;
        }