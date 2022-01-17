function () {
            this.el.on('click', function (clickEvent, el) {
                var extEl = Ext.get(el)
                  , parent;
                if(extEl.getAttribute('type') === 'checkbox') {
                    parent = extEl.parent('li')
                    this.fireEvent('todoChecked', this.getRecord(parent));
                }
            }, this, {
                // TODO I can't get this to delegate using something like div.view input or input[type="checkbox"]
                // So this will have a bug with teh input.edit field... I need to figure that out so I don't have to 
                // do the if logic above.
                delegate: 'input'
            });
        }