function() {
                var facet_model = this;

                // Copy the key entity.
                var key = JSON.parse(JSON.stringify(facet_model.get('KEY')));

                // Shortcuts.
                var qfield  = facet_model.get('quantity_field');

                // Set base filters on key entity context.
                if (! key['KEY_ENTITY']['CONTEXT']){
                    key['KEY_ENTITY']['CONTEXT'] = {};
                }
                var key_context = key['KEY_ENTITY']['CONTEXT'];
                if (! key_context['WHERE']){
                    key_context['WHERE'] = [];
                }
                var base_filters = facet_model.get('base_filters');
                if (base_filters){
                    filter_array = _app._filterObjectGroupsToArray(base_filters);
                    _.each(filter_array, function(f){
                        key_context['WHERE'].push(f);
                    });
                }

                // Get the base query.
                var base_inner_q = _app.makeFacetInnerQuery(facet_model, key, ['base_filters']);
                var base_outer_q = _app.makeFacetOuterQuery(facet_model, key, base_inner_q, 'base');

                // Get the primary query.
                var primary_inner_q = _app.makeFacetInnerQuery(facet_model, key, ['base_filters', 'primary_filters']);
                var primary_outer_q = _app.makeFacetOuterQuery(facet_model, key, primary_inner_q, 'primary');

                // Assemble the keyed result parameters.
                var keyed_results_parameters = {
                    "KEY": key,
                    "QUERIES": [base_outer_q, primary_outer_q]
                };

                // Assemble keyed query request.
                var keyed_query_request = {
                    'ID': 'keyed_results',
                    'REQUEST': 'execute_keyed_queries',
                    'PARAMETERS': keyed_results_parameters
                };

                var _this = this;

                // Assemble request.
                var requests = [];
                requests.push(keyed_query_request);

                // Execute the requests.
				$.ajax({
					url: requests_endpoint,
					type: 'POST',
					data: {'requests': JSON.stringify(requests)},
					error: Backbone.wrapError(function(){}, _this, {}),
					success: function(data, status, xhr){

                        var results = data.results;
                        var count_entity = qfield.get('outer_query_entity');

						// Parse data into histograms.
						var base_histogram = [];
						var primary_histogram = [];

						// Generate choices from data.
						var choices = [];
						_.each(results['keyed_results'], function(result){
							bucket_label = result['label'];
							var minmax_regex = /(-?\d+(\.\d*)?)\s*,\s*(-?\d+(\.\d*)?)/;
							var match = minmax_regex.exec(bucket_label);
							var bmin, bmax;
							if (match != null){
								bmin = parseFloat(match[1]);
								bmax = parseFloat(match[3]);
							}
							else{
								return;
							}

                            if (result['data']['base'] && result['data']['primary']){
                                var base_bucket = {
                                    bucket: bucket_label,
                                    min: bmin,
                                    max: bmax,
                                    count: result['data']['base'][count_entity['ID']]
                                };
                                base_histogram.push(base_bucket);

                                var primary_bucket = _.extend({}, base_bucket, {
                                    count: result['data']['primary'][count_entity['ID']]
                                });
                                primary_histogram.push(primary_bucket);
                            }
						});

						base_histogram = _.sortBy(base_histogram, function(b){return b.count});
						primary_histogram = _.sortBy(primary_histogram, function(b){return b.count;});

						_this.set({
                            base_histogram: base_histogram,
                            filtered_histogram: primary_histogram
						});
					}
				});
			}