function() {

                if (self._isDisabled(radios[key]) || self._isSelected(radios[key])) return;

                if (elLabel.contains(value)) {
                    value.detach('mouseenter');
                }
                value.addClass(hoverClass);
                //value.fire('mouseenter');
            }