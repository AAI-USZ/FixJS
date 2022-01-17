function(){
						onSizeChanged({
							top: parseInt($('.size-top-field', borderHtml).val(),10) || 0,
							right: parseInt($('.size-right-field', borderHtml).val(),10) || 0,
							bottom: parseInt($('.size-bottom-field', borderHtml).val(),10) || 0,
							left: parseInt($('.size-left-field', borderHtml).val(),10) || 0
						});
						settings.onChange();
				}