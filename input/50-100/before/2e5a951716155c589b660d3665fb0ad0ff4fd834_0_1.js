function(comp_src, comp_dest, alpha_src, alpha_dest) {
				return (255 - (Math.round((255 - comp_src) * (255 - comp_dest)) >> 8)) * alpha_src + comp_dest * alpha_dest * (1 - alpha_src);
			}