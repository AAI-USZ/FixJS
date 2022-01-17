function(attr, options){
                var _this = this;
                var combined_filters = _app._filterObjectGroupsToArray(_this.get('filters'));
				var params = [
					['filters', combined_filters]
				];
                _.each(['data_entity', 'geom_entity', 'geom_id_entity', 'grouping_entities'], function(entity_attr){
                    entity_model = this.get(entity_attr);
                    if (entity_model){
                        params.push([entity_attr, entity_model.toJSON()]);
                    }
                }, this);
				url_params = [];
				_.each(params, function(p){
					url_params.push(_s.sprintf("%s=%s", p[0], JSON.stringify(p[1])));
				},this);
                this.set('service_url', map_endpoint + '?' + url_params.join('&') + '&');
			}