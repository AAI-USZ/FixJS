function() {
				var self = this, url = this.data('url');
				if(!url) throw 'Elements of class .cms-panel-deferred need a "data-url" attribute';

				this._super();

				// If the node is empty, try to either load it from cache or via ajax.
				if(!this.children().length) {
					if(!this.data('deferredNoCache') && typeof window._panelDeferredCache[url] !== 'undefined') {
						this.html(window._panelDeferredCache[url]);
					} else {
						this.addClass('loading');
						$.ajax({
							url: url,
							complete: function() {
								self.removeClass('loading');
							},
							success: function(data, status, xhr) {
								self.html(data);
							}
						});
					}
				}
			}