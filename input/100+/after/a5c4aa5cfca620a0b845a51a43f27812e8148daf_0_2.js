function() {
            var self = this,
                target = self.get('target'),
                name = self.get('name'),
                tpl = self.get('tpl'),
                html,
                inputContainer,
                fileInput;
            if (!S.isString(name) || !S.isString(tpl)) {
                S.log(LOG_PREFIX + 'No name or tpl specified.');
                return false;
            }
            html = S.substitute(tpl, {
                'name' : name
            });
            // TODO: inputContainer = DOM.create(html);
            inputContainer = $(html);
            //向body添加表单文件上传域
            $(inputContainer).appendTo(target);
            fileInput = $(inputContainer).children('input');
            //TODO:IE6下只有通过脚本和内联样式才能控制按钮大小
            if(S.UA.ie == 6) fileInput.css('fontSize','400px');
            //TODO:firefox的fontSize不占宽度，必须额外设置left
            //if(S.UA.firefox)  fileInput.css('left','-1200px');
            //上传框的值改变后触发
            $(fileInput).on('change', self._changeHandler, self);
            self.set('fileInput', fileInput);
            self.set('inputContainer', inputContainer);
            //禁用按钮
            self._setDisabled(self.get('disabled'));
            //控制多选
            self._setMultiple(self.get('multiple'));
            return inputContainer;
        }