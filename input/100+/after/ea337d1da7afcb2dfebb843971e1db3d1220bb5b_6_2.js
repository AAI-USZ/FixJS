function() {

				var i, len, component, view, piece, $elForScrollEvent, scrollEventCallback, that = this;

				this.dealloc();

				for (i=0, len=this.uses.length; i<len; i++) {
					component = this.uses[i];

					switch (component.type) {
						case 'title':
							this.titleView = view = new this.TitleView({data: component});
							piece = view.render().el;
							break;

						case 'search':
							this.searchView = view = new this.SearchView({collection: this.source, data: component});
							piece = view.render().el;
							break;

						case 'list':
							this.listView = view = new this.ListView({collection: this.source, data: component});
							piece = view.render().el;

							if (this.options.scrollable) {
								var $wrap = $('<div class="scrollable-wrap"><div class="scrollable-inner"></div></div>');
								$wrap.find('.scrollable-inner').append(piece);
								piece = $wrap.get(0);
							}

							break;
					}

					this.$element.append(piece);
				}

				if (this.options.scrollable) {
					var $scrollableWrap = this.$element.find('.scrollable-wrap');

					$scrollableWrap.scrollable();
					this._scrollable = $scrollableWrap.data('scrollable');
				}

				// Set height on first render
				this.listView.setHeight();

				$elForScrollEvent = (this.options.scrollable) ? this.$element.find('.scrollable-inner') : this.listView.$el;

				scrollEventCallback = function() {
					var top = $elForScrollEvent.scrollTop();

					// Publish edge cases under specific events
					if (top === 0)
						that.publish('top');

					if (that.listView._height <= top)
						that.publish('bottom');

					// Always publish scroll
					that.publish('scroll');
				}
				scrollEventCallback = performance.throttle(scrollEventCallback, 300);

				$elForScrollEvent.on('scroll', scrollEventCallback);

				return this;
			}