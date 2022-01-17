function(target) {
            if (target === null) {
                if (this._.args) this.args = this._.args;
                timbre.listeners.remove(this);
            } else {
                if (fn.isTimbreObject(target)) {
                    this._.args = this.args;
                    this.args.removeAll();
                    this.args.append(target);
                    timbre.listeners.append(this);
                }
            }
            return this;
        }