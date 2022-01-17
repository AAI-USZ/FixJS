function (index, slide) {
					$(slide).attr('id',idSlideBox+'-'+(index+1));
					if (op.translucentElement) {
						$(slide).append(fn.tmpl(op.templatesTranslucent), {text: fn.culture});
					}
				}