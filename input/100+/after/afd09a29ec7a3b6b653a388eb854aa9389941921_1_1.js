function() {
      if (!this.canSet(attribute)) {
        return false;
      }
      var previous = this.attributes.get(attribute),
          messages = this.suppressValidation ? [] : this.validate(attribute, value);
      if (messages.length) {
        _triggerAttributeEvent(this, 'invalid', attribute, previous, value, messages);
        return false;
      } else {
        if (previous !== value) {
          this.attributes.set(attribute, value);
          if (flag) {
            _setFlagOn(this, attribute, flag);
          }
          _triggerAttributeEvent(this, 'change', attribute, previous, value);
          if (!this.suppressTracking
              && !Lavaca.util.ArrayUtils.contains(this.unsavedAttributes, attribute)) {
            this.unsavedAttributes.push(attribute);
          }
        }
        return true;
      }
    }