function(value, key) {
				value.hide();
				if (self._isDisabled(value)) {
					checkbox = $(disabledHTML).insertBefore(value).attr('ks-checkbox-disabled', 'disabled').removeAttr('tabindex');
				} else {
					// 如果本身是选中的状态
					checkbox = self._isChecked(value) ? $(checkedHTML) : $(html);
					checkbox.insertBefore(value);
				}
				// 无障碍访问
				try {
					if (accessible) {
						//优先选择函数提供的查询										
						labelText = getLabelFunc ? getLabelFunc(value).html() : value.next('label').html();
						checkbox.attr('aria-label', labelText);
					}
				} catch (e) {
					S.log('html结构不符合');
					return false;
				}
				checkboxArr.push(checkbox);
			}