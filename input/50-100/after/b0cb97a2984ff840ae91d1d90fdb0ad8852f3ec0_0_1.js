function(data) {
						self.removeClass('disabled').parents('.field:first').removeClass('loading');
						var newVal = decodeURIComponent(data.value);
						self.val(newVal);
						
						if(oldVal != newVal) {
							jQuery.noticeAdd(ss.i18n._t('The URL has been changed'));
						}
					}