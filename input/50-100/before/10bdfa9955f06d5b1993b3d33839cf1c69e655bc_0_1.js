function(selected_values){
                var formatted_filters = [
                    { 'entity': {'expression': this.model.get('grouping_entity').expression}, 'op': '>=', 'value': selected_values['selection_min']},
                    { 'entity': {'expression': this.model.get('grouping_entity').expression}, 'op': '<=', 'value': selected_values['selection_max']}
                ];
                return formatted_filters;
            }