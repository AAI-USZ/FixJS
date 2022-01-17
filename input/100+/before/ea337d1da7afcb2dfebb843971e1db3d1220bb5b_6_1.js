function(options) {
					this.collection.bind('reset', this.addAll, this);
					this.collection.bind('add', this.addOne, this);

					that.bind('search', this.search, this);

					if (that.options.scrollable) {
						this.collection.bind('reset', function() {
							if (!that._scrollable) return false;
							setTimeout(function() {
								that._scrollable.refresh();
							}, 0);
						});
						this.collection.bind('add', function() {
							if (!that._scrollable) return false;
							setTimeout(function() {
								that._scrollable.refresh();
							}, 0);
						});
						this.collection.bind('remove', function() {
							if (!that._scrollable) return false;
							setTimeout(function() {
								that._scrollable.refresh();
							}, 0);
						});
					}

					this.addAll();

					return this;
				}