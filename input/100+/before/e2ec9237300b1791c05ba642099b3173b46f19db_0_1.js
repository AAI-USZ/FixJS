function() {

				this.options = jQuery.extend({
					tag: 'div',
					type: null,
					id: null,
					className: null
				},(options || {}));

				var elem = this,
					$elem = jQuery(elem);

				var n, $n;
				if(n = document.createElement(this.options.tag)) {
					$n = jQuery(n);

					if(this.options.type!=null) {
						n.type = this.options.type;
					}

					if(this.options.class!=null) {
						$n.addClass(this.options.class);
					}

					if(this.options.id!=null) {
						$n.attr("id", this.options.id);
					}

					$elem.append(n);
				}

				ret.push(n);

			}