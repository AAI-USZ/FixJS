function(comp_src, comp_dst, alpha_src, alpha_dst) {
				return comp_dst * alpha_dst * alpha_src + comp_src * alpha_src * (1 - alpha_dst);
			}