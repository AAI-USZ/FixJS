function (v) {
            if (typeof(v) === 'function') {
                validators.push(new window.jermaine.Validator(v));
                return this;
            } else {
                throw new Error("Attr: validator must be a function");
            }
        }