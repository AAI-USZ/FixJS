function() {
                var combined_query_filters = _app._filterObjectGroupsToArray(_this.get('query_filters'));
                var combined_base_filters = _app._filterObjectGroupsToArray(_this.get('base_filters'));
				var data = {
					'filters': JSON.stringify(combined_query_filters.concat(combined_base_filters)),
					'base_filters': JSON.stringify(combined_base_filters),
					'data_entities': JSON.stringify(q.get('data_entities')),
					'grouping_entities': JSON.stringify(q.get('grouping_entities')),
					'with_unfiltered': true
				};
				var _this = this;
				$.ajax({
					url: aggregates_endpoint,
					type: 'GET',
					data: data,
					complete: function(xhr, status){
						datasource.set('loading', false);
					},
					error: Backbone.wrapError(function(){}, _this, {}),
					success: function(data, status, xhr){
						datasource.set('data', lji.parse(data));
					}
				});
			}