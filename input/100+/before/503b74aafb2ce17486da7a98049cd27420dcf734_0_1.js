function(option) {
                if(_.isString(option)){
                    return !validateAttr(this, option, this.get(option), _.extend({}, this.attributes));
                }
                if(_.isArray(option)){
                    for (var i = 0; i < option.length; i++) {
                        if(validateAttr(this, option[i], this.get(option[i]), _.extend({}, this.attributes))){
                            return false;
                        }
                    }
                    return true;
                }
                if(option === true) {
                    this.validate();
                }
                return this.validation ? this._isValid : true;
            }