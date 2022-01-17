function () {
            var args = base.argsToArray(arguments);
            if (this.__fired) {
                throw new Error("Already fired!");
            }
            this.__results = Array.prototype.slice.call(arguments);
            this.__resolve();
            return this;
        }