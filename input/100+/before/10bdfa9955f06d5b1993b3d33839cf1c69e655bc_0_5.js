function() {
                var combined_query_filters = _app._filterObjectGroupsToArray(_this.get('query_filters'));
                var combined_base_filters = _app._filterObjectGroupsToArray(_this.get('base_filters'));
				var data = {
					'filters': JSON.stringify(combined_query_filters.concat(combined_base_filters)),
					'base_filters': JSON.stringify(combined_base_filters),
					'grouping_entities': JSON.stringify([this.get('grouping_entity')]),
					'with_unfiltered': true,
					'base_filters': JSON.stringify(this.get('base_filters'))
				};
				var _this = this;
				$.ajax({
					url: aggregates_endpoint,
					type: 'GET',
					data: data,
					error: Backbone.wrapError(function(){}, _this, {}),
					success: function(data, status, xhr){

						// Parse data into histograms.
						var base_histogram = [];
						var filtered_histogram = [];

						var leafs = lji.parse(data);
						_.each(leafs, function(leaf){
							bucket_label = leaf.label;
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

							var unfiltered_bucket = {
								bucket: leaf.label,
								min: bmin,
								max: bmax,
								count: leaf.data[1].value
							};
							base_histogram.push(unfiltered_bucket);

							var filtered_bucket = _.extend({}, unfiltered_bucket);
							filtered_bucket.count = leaf.data[0].value;
							filtered_histogram.push(filtered_bucket);

						});

						base_histogram = _.sortBy(base_histogram, function(b){return b.count});
						filtered_histogram = _.sortBy(filtered_histogram, function(b){return b.count;});

						_this.set({
							base_histogram: base_histogram,
							filtered_histogram: filtered_histogram
						});
					}
				});
			}