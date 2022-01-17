function () {
                    return comb.executeInOrder(model[this.associatedDatasetName], model, this, this.parent, function (ds, model, self, parent) {
                        remove ? ds.filter(q).remove() : ds.filter(q).update(removeQ);
                        if (loaded) {
                            parent._reloadAssociationsForType(self.type, self.model, model);
                        }
                        return model;
                    });
                }