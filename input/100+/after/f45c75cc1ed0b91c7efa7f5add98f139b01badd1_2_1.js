function () {
                    var ds = model[this.associatedDatasetName], ret = new comb.Promise();
                    comb.when(remove ? this._filter(model).forEach(function (m) {
                        return m.remove();
                    }) : ds.filter(q).update(removeQ)).then(function () {
                        if (loaded) {
                            this.parent._reloadAssociationsForType(this.type, this.model, model)
                                .then(comb.hitchIgnore(ret, "callback", model), ret);
                        } else {
                            ret.callback(model);
                        }
                    }.bind(this), ret);
                    return ret;
                }