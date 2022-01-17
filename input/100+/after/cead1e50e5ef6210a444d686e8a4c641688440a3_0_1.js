function(attr, options){
                var _this = this;

                // A list of parameters to be added to the service url.
				var params = [];

                // Add filters to the params.
                var combined_query_filters = _app._filterObjectGroupsToArray(_this.get('query_filters'));
                var combined_base_filters = _app._filterObjectGroupsToArray(_this.get('base_filters'));
				params.push(['filters', combined_query_filters.concat(combined_base_filters)]);

                // Add entity params to the url.
                _.each(['data_entity', 'geom_entity', 'geom_id_entity', 'grouping_entities'], function(entity_attr){
                    entity_model = this.get(entity_attr);
                    if (entity_model){
                        params.push([entity_attr, entity_model.toJSON()]);
                    }
                }, this);

                // Convert params into url params.
				url_params = [];
				_.each(params, function(p){
					url_params.push(_s.sprintf("%s=%s", p[0], JSON.stringify(p[1])));
				},this);

                this.set('service_url', map_endpoint + '?' + url_params.join('&') + '&');
			}