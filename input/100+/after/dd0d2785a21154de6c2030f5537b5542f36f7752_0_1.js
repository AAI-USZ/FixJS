function (name) {
            if(name == 'value') {
                var value = this.attributes[name];
                if(value[0] == '"') {
                    value = value.slice(1, value.length - 1);
                }
                return decodeURIComponent(value);
            } else {
                return this.attributes[name];
            }
        }