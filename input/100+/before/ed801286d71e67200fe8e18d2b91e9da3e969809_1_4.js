function() {
            var self = this,
                radio = $(self.get('radio')),
                hoverClass = this.get('cls').hover,
                hasLabel = self.get('hasLabel'),
                targets = self.get('target'),
                getLabelFunc = self.get('getLabelFunc'),
                nextLabel;
            radio.each(function(value, key) {
                value.on('mouseenter mouseleave', function(ev) {
                    //如果本身是选中状态或者是禁用状态，则不做处理
                    if (self._isSelected(value) || self._isDisabled(value)) {
                        return;
                    }
                    //value.toggleClass('ks-radio-hover') 在初始化的时候就已经选中的无效
                    switch (ev.type) {
                    case 'mouseenter':
                        value.addClass(hoverClass);
                        break;
                    case 'mouseleave':
                        value.removeClass(hoverClass);
                        break;
                    default:
                        break;
                    }
                    //单击                
                }).on('click', function() {
                    if (self._isDisabled(value)) return;
                    self._clickHandler.call(self, key);
                    //按键 enter
                }).on('keyup', function(ev) {
                    if (ev.keyCode === 13) {
                        value.fire('click');
                    }
                });
                //如果需要 label-for
                if (hasLabel) {
                    try {
                        nextLabel = getLabelFunc ? getLabelFunc($(targets[key])) : value.next('label');
                        //将label绑定和radio一样的事件
                        nextLabel.on('click', function() {
                            value.fire('click');
                        }).on('mouseenter', function() {
                            value.fire('mouseenter');
                        }).on('mouseleave', function() {
                            value.fire('mouseleave');
                        })
                    } catch (e) {
                        S.log('html结构不符合');
                        return false;
                    }
                }
            })
        }