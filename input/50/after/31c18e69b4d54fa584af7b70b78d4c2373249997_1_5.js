function (id) {
                var _self = this;
                return {
                    id:id,
                    xclass:'bar-item-button',
                    text:_self.get(id + 'Text'),
                    disabled:true,
                    elCls:_self.get(id + 'Cls')
                };
            }