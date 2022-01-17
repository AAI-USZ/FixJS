function(val, callback) {
				var field = this.find(':text');
				$.get(
					this.closest('form').attr('action') + 
						'/field/' + field.attr('name') + '/suggest/?value=' + encodeURIComponent(val),
					function(data) {
						callback.apply(this, arguments);
					}
				);
				
			}