function(comp_src, comp_dst, alpha_src, alpha_dst) {
				return ((comp_dst < 128) ? (2 * ((Math.round(comp_src) >> 1) + 64)) * (comp_dst / 255) : (255 - (2 * (255 - ((Math.round(comp_src) >> 1) + 64)) * (255 - comp_dst) / 255))) * alpha_src + comp_dst * alpha_dst * (1 - alpha_src);
			}