function(comp_base, comp_new, alpha) {
					return composite(comp_base, Math.max(0, comp_base - comp_new), alpha);
				}