function (extBasename) {
            var ext = require("manifest")[extBasename];

            if (ext) {
                return ext.namespace;
            } else {
                return null;
            }
        }