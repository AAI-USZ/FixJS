function(selected_values){
                var formatted_filters = [
                    [this.model.get('filter_entity'), '>=', selected_values['selection_min']],
                    [this.model.get('filter_entity'), '<=', selected_values['selection_max']],
                ];
                return formatted_filters;
            }