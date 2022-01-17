function(template) {
                var instances = self.templateObjects;

                if (instances) {
                    instances.owner = self;
                } else {
                    self.templateObjects = instances = {owner: self};
                }

                // this actually also serves as isTemplateInstantiating
                self._isTemplateInstantiated = true;
                template.instantiateWithInstancesAndDocument(instances, self._element.ownerDocument, function() {
                    if (callback) {
                        callback();
                    }
                });
            }