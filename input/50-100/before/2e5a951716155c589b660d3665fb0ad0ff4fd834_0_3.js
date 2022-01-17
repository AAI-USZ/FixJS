function(comp_src, comp_dest, alpha_src, alpha_dest) {
				return ((comp_dest < 128) ? (2 * ((Math.round(comp_src) >> 1) + 64)) * (comp_dest / 255) : (255 - (2 * (255 - ((Math.round(comp_src) >> 1) + 64)) * (255 - comp_dest) / 255))) * alpha_src + comp_dest * alpha_dest * (1 - alpha_src);
			}