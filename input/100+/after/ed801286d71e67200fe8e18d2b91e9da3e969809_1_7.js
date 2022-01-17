function(targetElement) {
            var self = this,
                kfbtns = self.get('kfbtn'),
                kfbtn, targets = self.get('target'),
                target, disabledClass = this.get('cls').disabled;
            //如果传递的是数字索引
            if (S.isNumber(targetElement)) {
                kfbtn = $(kfbtns[targetElement]);
                target = $(targets[targetElement]);
                kfbtn.removeAttr('ks-kfbtn-disabled', 'disabled').removeClass(disabledClass);
                target.removeAttr('disabled', 'disabled');
                kfbtn.attr('tabindex', '0');
            }
            return self;
        }