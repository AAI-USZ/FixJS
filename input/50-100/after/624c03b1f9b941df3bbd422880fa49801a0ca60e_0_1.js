function(binding, key) {
                if (binding.get[1])
                    this.$el.off(binding.getTrigger, binding.selector);

                if (binding.set)
                    this.model.off(binding.setTrigger, binding.set);

                delete this._bindings[key];
            }