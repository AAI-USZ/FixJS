function(comp_src, comp_dest, alpha_src, alpha_dest) {
				return comp_dest * alpha_dest * alpha_src + comp_src * alpha_src * (1 - alpha_dest);
			}