function(){
            var range_min = this.model.get('range_min');
            var range_max = this.model.get('range_max');

            if (this.model.get('range_auto')){
                var base_histogram_stats = this.getHistogramStats(this.model.get('base_histogram'));
				range_min = base_histogram_stats['x_min'];
				range_max = base_histogram_stats['x_max'];
            }

            var selection_min = 0;
            var selection_max = 100;
            if (this.selection.min == null || this.selection.max == null){
                var filtered_histogram_stats = this.getHistogramStats(this.model.get('filtered_histogram'));
                selection_min = filtered_histogram_stats['x_min'];
                selection_max = filtered_histogram_stats['x_max'];
            }
            else{
                selection_min = this.selection['min']; 
                selection_max = this.selection['max'];
            }

			this.range_selection.set({
				range_min: range_min,
				range_max: range_max,
				selection_min: selection_min,
				selection_max: selection_max
			});

            var format = this.model.get('format') || "%.1f";
            var formatted_min = _s.sprintf(format, range_min);
            var formatted_max= _s.sprintf(format, range_max);

			$('.facet-status .range', this.el).html(_s.sprintf("%s to %s", formatted_min, formatted_max));
		}