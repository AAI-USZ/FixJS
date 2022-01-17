function(idOrUrl, successCallback) {
				var self = this, params = (Number(idOrUrl) == idOrUrl) ? {ID: idOrUrl} : {FileURL: idOrUrl},
					item = $('<div class="ss-htmleditorfield-file" />');

				item.addClass('loading');
				this.find('.content-edit').append(item);
				$.ajax({
					// url: this.data('urlViewfile') + '?ID=' + id,
					url: $.path.addSearchParams(this.attr('action').replace(/MediaForm/, 'viewfile'), params),
					success: function(html, status, xhr) {
						var newItem = $(html);
						item.replaceWith(newItem);
						self.redraw();
						if(successCallback) successCallback.call(newItem, html, status, xhr);
					},
					error: function() {
						item.remove();
					}
				});
			}