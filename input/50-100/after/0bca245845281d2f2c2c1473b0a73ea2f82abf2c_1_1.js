function(v,k) {
					if (['id','_id'].indexOf(k) >= 0) { return v; }
					if (!_(v).isArray()) { v = [v]; }
					return v.map(function(vv) {
						// value specific coercion here e.g., date time formats to our date time format
						return vv;
					});
				}