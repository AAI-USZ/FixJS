function(value, key) {
                value.hide();
                if (self._isDisabled(value)) {
                    radio = $(disabledHTML).insertBefore(value).attr('ks-radio-disabled', 'disabled').removeAttr('tabindex');
                } else {
                    // 如果本身是选中的状态
                    radio = self._isSelected(value) ? $(selectedHTML) : $(html);
                    radio.insertBefore(value);
                }
                // 无障碍
                if (accessible) {
                    try {
                        //优先选择函数提供的查询
                        labelText = getLabelFunc ? getLabelFunc(value).html() : value.next('label').html();
                        radio.attr('aria-label', labelText);
                    } catch (e) {
                        S.log('html结构不符合');
                    }

                }
                radioArr.push(radio);
            }