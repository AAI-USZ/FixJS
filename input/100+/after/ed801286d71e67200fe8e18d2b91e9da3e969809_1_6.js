function(targetElement) {
            var self = this,
                kfbtns = self.get('kfbtn'),
                kfbtn, targets = self.get('target'),
                target, getClass = this.get('cls'),
                selectedClass = getClass.selected,
                disabledClass = getClass.disabled,
                hoverClass = getClass.hover;
            //如果传递的是数字索引
            if (typeof targetElement === 'number') {
                kfbtn = $(kfbtns[targetElement]);
                target = $(targets[targetElement]);
                kfbtn.attr('ks-kfbtn-disabled', 'disabled').removeClass(selectedClass + ' ' + hoverClass).addClass(disabledClass);
                target.attr('disabled', 'disabled');
                kfbtn.removeAttr('tabindex');
            }
            return self;
        }