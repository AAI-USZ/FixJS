function(comp_src, comp_dst, alpha_src, alpha_dst) {
				return (255 - (Math.round((255 - comp_src) * (255 - comp_dst)) >> 8)) * alpha_src + comp_dst * alpha_dst * (1 - alpha_src);
			}