function(){
                console.log("lfgd");

                var _this = this;
                qfield = this.get('quantity_field');
                keyed_query_req = _app.makeFacetKeyedQueryRequest(_this);

                outer_q = keyed_query_req['PARAMETERS']['QUERIES'][0];

                // Assemble totals query.
                var totals_q = _.extend({}, outer_q, {
                    'ID': 'totals',
                    'SELECT_GROUP_BY': false,
                    'GROUP_BY': []
                });
            
                // Assemble totals request.
                var totals_request = {
                    'ID': 'totals',
                    'REQUEST': 'execute_queries',
                    'PARAMETERS': {'QUERIES': [totals_q]}
                };

                // Assemble request.
                var requests = [];
                requests.push(keyed_query_req);
                requests.push(totals_request);

                // Execute the requests.
				$.ajax({
					url: requests_endpoint,
					type: 'POST',
					data: {'requests': JSON.stringify(requests)},
					error: Backbone.wrapError(function(){}, _this, {}),
					success: function(data, status, xhr){
                        var results = data.results;
                        var count_entity = qfield.get('outer_query_entity');

						// Set total.
						var total = results['totals']['totals'][0][count_entity['ID']];
						_this.set('total', total, {silent:true});

						// Generate choices from data.
						var choices = [];
						_.each(results['keyed_results'], function(result){
                            value = result['data']['outer'][count_entity['ID']];
							choices.push({
								id: result['key'],
								label: result['label'],
								count: value,
                                count_label: _s.sprintf(qfield.get('format') || '%s', value)
							});
						});
						_this.set('choices', choices);
					}
				});
			}