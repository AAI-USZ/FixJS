function(){
						onRadiusChanged({
							top: parseInt($('.radius-top-field', borderHtml).val(),10) || 0,
							right: parseInt($('.radius-right-field', borderHtml).val(),10) || 0,
							bottom: parseInt($('.radius-bottom-field', borderHtml).val(),10) || 0,
							left: parseInt($('.radius-left-field', borderHtml).val(),10) || 0
						});
				}