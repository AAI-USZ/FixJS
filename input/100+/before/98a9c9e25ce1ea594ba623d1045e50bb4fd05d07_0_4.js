function(option) {
                if(_.isString(option)){
                    return !validateAttr(this, this.validation, option, this.get(option), this.toJSON());
                }
                if(_.isArray(option)){
                    for (var i = 0; i < option.length; i++) {
                        if(validateAttr(this, this.validation, option[i], this.get(option[i]), this.toJSON())){
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