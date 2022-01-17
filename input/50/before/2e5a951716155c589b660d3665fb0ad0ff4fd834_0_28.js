function(comp_src, comp_dest, alpha_src, alpha_dest) {
				return (comp_src + comp_dest) / 2 * alpha_src + comp_dest * alpha_dest * (1 - alpha_src);
			}