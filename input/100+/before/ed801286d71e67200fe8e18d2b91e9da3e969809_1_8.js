function() {
            var self = this,
                target = self.get('target'),
                value;
            for (i = 0, len = target.length; i < len; i++) {
                value = $(target[i]);
                if (self._isDisabled(value)) {
                    continue;
                }
                if (self._isSelected(value)) {
                    return i;
                }
            }
            return null;
        }