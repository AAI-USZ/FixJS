function(record, index, rowParams, store) {
            var c = record.get('maked');
            if (c) {
				return 'maked_true_class';
			} else {
				return 'maked_false_class';				
			}
        }