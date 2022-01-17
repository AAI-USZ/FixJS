function(attr, value) {
                return validateAttr(this, attr, value, _.extend({}, this.attributes));
            }