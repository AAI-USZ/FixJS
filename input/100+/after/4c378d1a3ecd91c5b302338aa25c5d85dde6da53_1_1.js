function(value) {
                value.hide();
                if (self._isDisabled(value)) {
                    kfbtn = $(disabledHTML).insertBefore(value).attr('ks-kfbtn-disabled', 'disabled').removeAttr('tabindex');
                } else {
                    // 如果本身是选中的状态
                    kfbtn = self._isSelected(value) ? $(selectedHTML) : $(html);
                    kfbtn.insertBefore(value);
                }
                // 无障碍
                if (accessible) {
                    try {
                        //优先选择函数提供的查询
                        labelText = getLabelFunc ? getLabelFunc(value).text() : value.next('label').text();
                        kfbtn.attr('aria-label', labelText);
                    } catch (e) {
                        S.log('html结构不符合');
                        return false;
                    }
                }
                kfbtnArr.push(kfbtn);
            }