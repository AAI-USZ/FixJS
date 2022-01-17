function (attr, value, options) {
            if (!attr || !value)
                return;
            options = (options)? options : {};
                
            attr = VIE.Util.mapAttributeNS(attr, self.vie.namespaces);
            
            if (_.isArray(value)) {
                for (var v = 0; v < value.length; v++) {
                    this._setOrAddOne(attr, value[v], options);
                }
                return;
            }
            
            if (attr === "@type" && value instanceof self.vie.Type) {
            	value = value.id;
            }
            
            var obj = {};
            var existing = Backbone.Model.prototype.get.call(this, attr);
            
            if (!existing) {
                obj[attr] = value;
                this.set(obj, options);
            } else if (existing.isCollection) {
                if (value.isCollection) {
                    value.each(function (model) {
                        existing.add(model);
                    });
                } else if (value.isEntity) {
                    existing.add(value);
                } else if (typeof value === "object") {
                    value = new this.vie.Entity(value);
                    existing.add(value);
                } else {
                    throw new Error("you cannot add a literal to a collection of entities!");
                }
                this.trigger('change:' + attr, this, value, {});
                this.change({});
            } else if (_.isArray(existing)) {
                if (value.isCollection) {
                	for (var v = 0; v < value.size(); v++) {
                		this._setOrAddOne(attr, value.at(v).getSubject(), options);
                	}
                } else if (value.isEntity) {
                	this._setOrAddOne(attr, value.getSubject(), options);
                } else if (typeof value === "object") {
                	value = new this.vie.Entity(value);
                	this._setOrAddOne(attr, value, options);
                } else {
                    /* yes, we (have to) allow multiple equal values */
                    existing.push(value);
                    obj[attr] = existing;
                    this.set(obj);
                }
            } else {
                var arr = [ existing ];
                arr.push(value);
                obj[attr] = arr;
                return this.set(obj, options);
            }
        }