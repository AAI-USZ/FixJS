function(key, value, options) {
				var attrs, current;
				if (utils.isObject(key) || key == null) {
					attrs = key;
					options = value;
				} else {
					attrs = {};
					attrs[key] = value;
				}

				options = options ? collection.clone(options) : {};
				if (options.wait) current = collection.clone(this.attributes);
				var silentOptions = Sushi.extend({}, options, {silent: true});

				if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
					return false;
				}

				var model = this,
				success = options.success,
				method = this.isNew() ? 'create' : 'update';

				options.success = function(resp, status, xhr) {
					var serverAttrs = model.parse(resp, xhr);
					if (options.wait) {
						delete options.wait;
						serverAttrs = Sushi.extend(attrs || {}, serverAttrs);
					}
					if (!model.set(serverAttrs, options)) return false;
					if (success) {
						success(model, resp);
					} else {
						model.trigger('sync', model, resp, options);
					}
				};

				options.error = wrapError(options.error, model, options);
				var xhr = (this.sync || this.store.sync || stores.def.sync).call(this, method, this, options);
				if (options.wait) this.set(current, silentOptions);
				return xhr;
			}