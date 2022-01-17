function(){
					var format = this.model.get('quantity_field').get('format') || "%s";
					var data = this.model.get('data');

                    // Do nothing if data is incomplete.
                    if (data.selected == null || data.total == null){
                        return;
                    }

					var formatted_selected = _s.sprintf(format, data.selected);
					var formatted_total = _s.sprintf(format, data.total);
					var percentage = 100.0 * data.selected/data.total;
					$(".data", this.el).html(_s.sprintf('<span class="selected">%s</span> <span class="percentage">(%.1f%% of %s total)</span>', formatted_selected, percentage, formatted_total));

                    // Set totals on facets.
                    _.each(_app.facets.models, function(facet_model){
                        facet_model.set('total', data.total);
                    });

				}