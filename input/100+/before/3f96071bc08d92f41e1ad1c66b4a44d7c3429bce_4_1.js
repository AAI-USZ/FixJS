function(e) {
                var evt = new EventClass(e);
                if (evt.keyCode() === 13 && !self.options.noEnterKeySubmit) {
                    self.update();
                    return false;
                }
                else {
                    var newval = safeStr.htmlEntities(pl(sel).attr('value')),
                        validMsg = self.fieldBase.validator.validate(newval);
                    if (validMsg !== 0) {
                        self.fieldBase.msg.show('attention', validMsg);
                        icon.showInvalid();
                    }
                    else {
                        if (!self.fieldBase.msg.isClear) {
                            self.fieldBase.msg.clear();
                        }
                        if (!icon.isValid) {
                            icon.showValid();
                        }
                        if (self.inpaste) {
                            self.inpaste = false;
                            self.update();
                        }
                    }
                }
                return true;
            }