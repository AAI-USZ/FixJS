function (obj, def) {

                return this.isBool(obj) ?

                        obj : def || false;

            }