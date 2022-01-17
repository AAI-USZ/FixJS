function(comp_src, comp_dst, alpha_src, alpha_dst) {
				return ((comp_src < 128) ? (2 * comp_dst * comp_src / 255) : (255 - 2 * (255 - comp_dst) * (255 - comp_src) / 255)) * alpha_src + comp_dst * alpha_dst * (1 - alpha_src);
			}