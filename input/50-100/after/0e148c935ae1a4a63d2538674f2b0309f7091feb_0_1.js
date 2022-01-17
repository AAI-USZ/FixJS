function (property, config) {
            if(typeOf(config.maskRegExp) != "regexp") {
                config.maskCount = config.mask.match(/@/g).length;
                config.maskRegExp = new RegExp("^" +
                    config.mask
                        //escape!
                        .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")

                        .replace(/@d/g, '(\-?[0-9]*\.[0-9]*)') // digit at least one, % zero or one
                        .replace(/@i/g, '(\-?[0-9]*)') // digit at least one, % zero or one
                        //.replace(/@h/g, '([0-9A-Fa-f]{2})') // two: 0-9 and 0-f letter insensitive
                + "$")
            }

            this.prototype.__animation[property] = config;

            return config;
        }