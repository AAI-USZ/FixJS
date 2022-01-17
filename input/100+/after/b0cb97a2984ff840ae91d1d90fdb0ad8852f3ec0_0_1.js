function(e) {
					if(!self.val()) return;
					
					self.addClass('disabled').parents('.field:first').addClass('loading');
					var oldVal = self.val();
					self.suggest(oldVal, function(data) {
						self.removeClass('disabled').parents('.field:first').removeClass('loading');
						var newVal = decodeURIComponent(data.value);
						self.val(newVal);
						
						if(oldVal != newVal) {
							jQuery.noticeAdd(ss.i18n._t('The URL has been changed'));
						}
					});
					
				}