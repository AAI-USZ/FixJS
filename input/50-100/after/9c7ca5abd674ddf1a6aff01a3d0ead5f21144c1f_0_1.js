function(record, index, rowParams, store) {
            var c = record.get('rolled_by');
            if (c>0) {
                return ''
            }
            var c = record.get('maked');
            if (c) {
				return 'maked_true_class';
			} else {
				return 'maked_false_class';				
			}
        }