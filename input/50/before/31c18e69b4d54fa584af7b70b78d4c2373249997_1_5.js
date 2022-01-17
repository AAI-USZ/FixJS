function (id) {
                var _self = this;
                return {
                    id:id,
                    xtype:'button',
                    text:_self.get(id + 'Text'),
                    disabled:true,
                    elCls:_self.get(id + 'Cls')
                };
            }