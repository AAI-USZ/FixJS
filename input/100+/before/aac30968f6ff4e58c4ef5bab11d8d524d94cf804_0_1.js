function(arg1, arg2, arg3){ // (
                   var attrs = {}, options;
            if (!arg1) {
                return this;
            }

            if (arg1['@subject']) {
                arg1['@subject'] = this.toReference(arg1['@subject']);
            }

            // Use **`.set(attrName, value, options)`** for setting or changing exactly one 
            // entity attribute.
            if (typeof arg1 === "string") {
                args[arg1] = arg2;
                options = arg3;
                return this.set(args, options);
            } else if(typeof arg1 === "object") {
                options = arg2;
                // **`.set(entity)`**: In case you'd pass a VIE entity,
                // the passed entities attributes are being set for the entity.
                if (arg1.attributes) {
                    attrs = arg1.attributes;
                } else {
                    attrs = arg1;
                }
                var self = this;
                // resolve shortened URIs like rdfs:label..
                _.each(attrs, function (value, key) {
                    var newKey = VIE.Util.mapAttributeNS(key, self.vie.namespaces);
                    if (key !== newKey) {
                        delete attrs[key];
                        attrs[newKey] = value;
                    }
                }, this);
                // Finally iterate through the *attributes* to be set and prepare
                // them for the Backbone.Model.set method.
                _.each(attrs, function (value, key) {
                    if (!value) {
                        return;
                    }
                    if (key.indexOf('@') === -1) {
                        if (value.isCollection) {
                            // ignore
                            value.each(function (child) {
                                self.vie.entities.addOrUpdate(child);
                            });
                        } else if (value.isEntity) {
                            self.vie.entities.addOrUpdate(value);
                            var coll = new self.vie.Collection();
                            coll.vie = self.vie;
                            coll.add(value);
                            attrs[key] = coll;
                        } else if (_.isArray(value)) {
                            if (this.attributes[key] && this.attributes[key].isCollection) {
                                var newEntities = this.attributes[key].addOrUpdate(value);
                                attrs[key] = this.attributes[key];
                                attrs[key].reset(newEntities);
                            }
                        } else if (value["@value"]) {
                            // The value is a literal object, ignore
                        } else if (typeof value == "object") {
                            // The value is another VIE Entity
                            var child = new self.vie.Entity(value, options);
                            // which is being stored in `v.entities`
                            self.vie.entities.addOrUpdate(child);
                            // and set as VIE Collection attribute on the original entity
                            var coll = new self.vie.Collection();
                            coll.vie = self.vie;
                            coll.add(value);
                            attrs[key] = coll;
                        } else {
                            // ignore
                        }
                    }
                }, this);
                return Backbone.Model.prototype.set.call(this, attrs, options);
            }
        }