function () {
                        if (loaded) {
                            this.parent._reloadAssociationsForType(this.type, this.model, model)
                                .then(comb.hitchIgnore(ret, "callback", model), ret);
                        } else {
                            ret.callback(model);
                        }
                    }