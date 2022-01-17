function (index, slide) {
					$(slide).attr('id',idSlideBox+'-'+(index+1));
					if (op.translucentElement) {
						$(slide).append(fn.tmpl('#slice-slide-translucent'), {});
					}
				}