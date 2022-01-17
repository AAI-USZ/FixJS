function(comp_src, comp_dst, alpha_src, alpha_dst) {
				return (comp_src * comp_dst) / 255 * alpha_src + comp_dst * alpha_dst * (1 - alpha_src);
			}