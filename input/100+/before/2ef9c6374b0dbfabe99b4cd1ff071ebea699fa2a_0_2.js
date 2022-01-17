function() {
				var container = $(this);
				$.ajax(context.action, {
					method: context.method,
					data: context.query,
					dataType: 'HTML',
					cache: false,
					success: function(html) {
						result = html;
						context.onSuccess(result);
						container.html(html);
						if (context.dialogCancel) {
							dlg.find(context.dialogCancel).click(function() {
								dlg.dialog('close');
							});
						}
					},
					error: function(ex, type, message) {
						result = {ex: ex, type: type, message: message};
						context.onError(message);
						container.html(message);
					},
					complete: function() {
						dlg.find('.java-interaction-overlay').remove();
						context.onComplete(result);
					}
				});
			}