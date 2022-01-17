function(val, callback) {
				var field = this.find(':text'), urlParts = $.path.parseUrl(this.closest('form').attr('action')),
					url = urlParts.hrefNoSearch + '/field/' + field.attr('name') + '/suggest/?value=' + encodeURIComponent(val);
				if(urlParts.search) url += '&' + urlParts.search.replace(/^\?/, '');

				$.get(
					url,
					function(data) {callback.apply(this, arguments);}
				);
				
			}