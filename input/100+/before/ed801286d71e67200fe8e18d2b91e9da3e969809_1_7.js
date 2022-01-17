function(targetElement) {
            var self = this,
                radio = self.get('radio'),
                targets = self.get('target'),
                target, disabledClass = this.get('cls').disabled;
            //如果传递的是数字索引
            if (S.isNumber(targetElement)) {
                radio = $(radio[targetElement]);
                target = $(targets[targetElement]);
                radio.removeAttr('ks-radio-disabled', 'disabled').removeClass(disabledClass);
                target.removeAttr('disabled', 'disabled');
            }
            radio.attr('tabindex', '0');
            return self;
        }