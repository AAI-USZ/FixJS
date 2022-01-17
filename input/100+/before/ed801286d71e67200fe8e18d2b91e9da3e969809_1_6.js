function(targetElement) {
            var self = this,
                radio = self.get('radio'),
                targets = self.get('target'),
                target, getClass = this.get('cls'),
                selectedClass = getClass.selected,
                disabledClass = getClass.disabled,
                hoverClass = getClass.hover;
            //如果传递的是数字索引
            if (typeof targetElement === 'number') {
                radio = $(radio[targetElement]);
                target = $(targets[targetElement]);
                radio.attr('ks-radio-disabled', 'disabled').removeClass(selectedClass + ' ' + hoverClass).addClass(disabledClass);
                target.attr('disabled', 'disabled');
            }
            radio.removeAttr('tabindex');
            return self;
        }