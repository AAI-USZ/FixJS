function(isCheckbox) {
            var self = this,
                target = self.get('target'),
                value, checkArr = [];
            for (i = 0, len = target.length; i < len; i++) {
                value = $(target[i]);
                if (self._isDisabled(value)) continue;
                if (self._isSelected(value)) {
                    if (!isCheckbox) {
                        return i;
                    }
                    checkArr.push(i);
                }
            }
            return isCheckbox ? checkArr : null;
        }