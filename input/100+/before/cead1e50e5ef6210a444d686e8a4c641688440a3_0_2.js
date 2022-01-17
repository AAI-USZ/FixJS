f			var initial_state = GeoRefine.config.initial_state;

			// Initialize summary bar.
			this.summary_bar.setSelectedField(initial_state.summary_bar.selected);

			// Initialize Data Views.
			//_.each(initial_state.data_views, function(data_view){
			_.each([], function(data_view){

				// Handle map data views.
				if (data_view.type == 'map'){
					var map_editor = this.createMapEditor();

					// Handle initial extents.
					if (data_view.hasOwnProperty("initial_extent")){
						map_editor.map_view.model.set('initial_extent', data_view.initial_extent);
					}

					// Handle layer configs.
					_.each(data_view.layers, function(layer){
						map_editor.map_view.layers.get(layer.id).set(layer.attributes);
					});

					// Create window.
					this.createDataViewWindow(map_editor, {
						"title": "Map"
					});
				}

				// Handle chart data views.
				else if (data_view.type == 'chart'){
					var chart_editor = this.createChartEditor();
					_.each(["category", "quantity"], function(field_type){
						var field_attr = _s.sprintf("initial_%s_field", field_type);
						if (data_view.hasOwnProperty(field_attr)){
							var fields = chart_editor.model.get('datasource').get('schema').get(field_type + "_fields");
							var field = fields.get(data_view[field_attr].id);
							field.set(data_view[field_attr].attributes);
							field.get('entity').set(data_view[field_attr].entity);
							chart_editor[_s.sprintf("%s_field_selector", field_type)].model.set(_s.sprintf("selected_field", field_type), field);
						}
					}, this);
					this.createDataViewWindow(chart_editor, {
						"title": "Chart"
					});
				}


			}, this);
			
		}
