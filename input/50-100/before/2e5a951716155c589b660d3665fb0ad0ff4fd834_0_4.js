function(comp_src, comp_dest, alpha_src, alpha_dest) {
				return ((comp_src < 128) ? (2 * comp_dest * comp_src / 255) : (255 - 2 * (255 - comp_dest) * (255 - comp_src) / 255)) * alpha_src + comp_dest * alpha_dest * (1 - alpha_src);
			}