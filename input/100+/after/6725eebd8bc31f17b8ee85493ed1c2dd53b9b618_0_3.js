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
					$(".text .field", this.el).html(_s.sprintf("'%s'", this.model.get('quantity_field').get('label')));
					$(".text .selected", this.el).html(formatted_selected);
					$(".text .total", this.el).html(_s.sprintf('(%.1f%% of %s total)', percentage, formatted_total));

                    // Set totals on facets.
                    _.each(_app.facets.models, function(facet_model){
                        facet_model.set('total', data.total);
                    });

				}