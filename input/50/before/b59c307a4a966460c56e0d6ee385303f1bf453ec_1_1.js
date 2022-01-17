function (i) {
            if (this.__fired) {
                throw i || new Error("Already fired");
            }
            this.__error = Array.prototype.slice.call(arguments);
            this.__resolve();
            return this;
        }