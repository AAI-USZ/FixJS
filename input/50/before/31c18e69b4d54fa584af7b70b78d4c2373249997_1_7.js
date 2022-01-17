function (id) {
                var _self = this;
                return {
                    id:id,
                    xtype:'text',
                    text:_self._getTextItemTpl(id)
                };
            }