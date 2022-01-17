function(comp_src, comp_dest, alpha_src, alpha_dest, alpha_merged) {
					return (comp_src * alpha_src + comp_dest * alpha_dest * (1 - alpha_src)) / alpha_merged;
				}