function (args) {
            if (this.__fired) {
                throw args || new Error("Already fired");
            }
            this.__error = Array.prototype.slice.call(arguments);
            this.__resolve();
            return this;
        }