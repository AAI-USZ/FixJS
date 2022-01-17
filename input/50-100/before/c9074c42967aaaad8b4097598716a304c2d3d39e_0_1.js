function(a, b) {
			var name_a = a.name.toLowerCase() ,
				name_b = b.name.toLowerCase()
			;
			
			if ( name_a > name_b ) {
				return 1;
			} else if ( name_a < name_b ) {
				return -1;
			} else {
				return 0;
			}
			
		}