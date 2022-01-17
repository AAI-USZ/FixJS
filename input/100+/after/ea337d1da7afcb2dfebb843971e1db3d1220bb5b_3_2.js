function(key, value, options) {
				var now,
					attrs,
					attr,
					escaped,
					prev,
					alreadySetting,
					val;

				if (utils.isObject(key) || key == null) {
					attrs = key;
					options = value;
				} else {
					attrs = {};
					attrs[key] = value;
				}

				options || (options = {});
				if (!attrs) return this;
				if (attrs instanceof Model) attrs = attrs.attributes;
				if (options.unset) for (attr in attrs) attrs[attr] = void 0;

				if (!this._validate(attrs, options)) return false;
				if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

				now = this.attributes;
				escaped = this._escapedAttributes;
				prev = this._previousAttributes || {};
				alreadySetting = this._setting;
				this._changed || (this._changed = {});
				this._setting = true;

				for (attr in attrs) {
					val = attrs[attr];

					if (!utils.isEqual(now[attr], val)) delete escaped[attr];

					options.unset ? delete now[attr] : now[attr] = val;

					if (this._changing && !utils.isEqual(this._changed[attr], val)) {
						this.trigger('change:' + attr, this, val, options);
						this._moreChanges = true;
					}
					delete this._changed[attr];

					if (!utils.isEqual(prev[attr], val) || (utils.has(now, attr) != utils.has(prev, attr))) {
						this._changed[attr] = val;
					}
				}

				if (!alreadySetting) {
					if (!options.silent && this.hasChanged()) this.change(options);
					this._setting = false;
				}

				return this;
			}