function(data, status, xhr){

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