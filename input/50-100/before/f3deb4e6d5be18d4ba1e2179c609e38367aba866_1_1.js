function (clickEvent, el) {
                var extEl = Ext.get(el)
                  , parent;
                if(extEl.getAttribute('type') === 'checkbox') {
                    parent = extEl.parent('li')
                    this.fireEvent('todoChecked', this.getRecord(parent));
                }
            }