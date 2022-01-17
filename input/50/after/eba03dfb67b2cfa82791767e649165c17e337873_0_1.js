function(i, r) {
			    var key = 'rrule' + saved;
			    tomato_env.set(key, build_rule(r, false, g.devices));
			    saved++;
			}