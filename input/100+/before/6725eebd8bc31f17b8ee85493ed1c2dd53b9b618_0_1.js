function() {
                console.log("datasource getData", arguments);

                var cfield = q.get('category_field');
                var qfield = q.get('quantity_field');

                if (! cfield || ! qfield){
                    return;
                }

                // Copy the key entity.
                var key = JSON.parse(JSON.stringify(cfield.get('KEY')));

                // Set base filters on key entity context.
                if (! key['KEY_ENTITY']['CONTEXT']){
                    key['KEY_ENTITY']['CONTEXT'] = {};
                }
                var key_context = key['KEY_ENTITY']['CONTEXT'];
                _app.addFiltersToQuery(q, ['base_filters'], key_context);

                // Get the base query.
                var base_inner_q = _app.makeKeyedInnerQuery(q, key, ['base_filters']);
                var base_outer_q = _app.makeKeyedOuterQuery(q, key, base_inner_q, 'base');

                // Get the primary query.
                var primary_inner_q = _app.makeKeyedInnerQuery(q, key, ['base_filters', 'primary_filters']);
                var primary_outer_q = _app.makeKeyedOuterQuery(q, key, primary_inner_q, 'primary');

                // Assemble the keyed result parameters.
                var keyed_results_parameters = {
                    "KEY": key,
                    "QUERIES": [base_outer_q, primary_outer_q]
                };

                // Assemble keyed query request.
                var requests = [];
                var keyed_query_request = {
                    'ID': 'keyed_results',
                    'REQUEST': 'execute_keyed_queries',
                    'PARAMETERS': keyed_results_parameters
                };
                requests.push(keyed_query_request);

				$.ajax({
					url: requests_endpoint,
					type: 'POST',
					data: {'requests': JSON.stringify(requests)},
                    complete: function(){
                        datasource.set('loading', false);
                    },
					error: Backbone.wrapError(function(){
                        console.log("error", arguments);
                    }, q, {}),
					success: function(data, status, xhr){
                        var results = data.results;
                        var count_entity = qfield.get('outer_query')['SELECT'][0];

                        // Format data for chart.
                        var chart_data = [];

                        _.each(results['keyed_results'], function(result){
                            if (result['data']['base']){

                                var base_value = result['data']['base'][count_entity['ID']];
                                var primary_value = 0;
                                if (result['data']['primary']){
                                    primary_value = result['data']['primary'][count_entity['ID']];
                                }

                                var chart_datum = {
                                    id: result.key,
                                    label: result.label,
                                    data: {
                                        'primary': {value: primary_value},
                                        'base': {value: base_value}
                                    }
                                };

                                chart_data.push(chart_datum);
                            }
                        });

						datasource.set('data', chart_data);
					}
				});
			}