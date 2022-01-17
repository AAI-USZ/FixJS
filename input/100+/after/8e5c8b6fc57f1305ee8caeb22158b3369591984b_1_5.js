function(idx, opts) {
					var u = this.options.url[idx].replace(/\/$/, '');
					u += this.options.contenthub.urlPostfix.replace(/\/$/, '');

					var index = (opts.index) ? opts.index
							: this.options.contenthub.index;

					u += "/" + index.replace(/\/$/, '');
					u += "/store/metadata";

					u += "/" + id;

					return u;
				}