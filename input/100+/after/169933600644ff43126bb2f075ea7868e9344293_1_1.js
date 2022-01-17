function(){
				var el = this.el ? this.el : 'body',
					$el = _.isObject(el) ? el : $(el);
				if (!$el.length) {
					return $($.proxy(this.initEl, this));
				}
				this.$el = $el;
				this._cssPos = ($el.get(0)===document.body) ? 'fixed' : 'absolute';
				$el.css('position', 'relative');
				if (this._cssPos === 'absolute') {
					$el.css('overflow', 'hidden');
				}
			}