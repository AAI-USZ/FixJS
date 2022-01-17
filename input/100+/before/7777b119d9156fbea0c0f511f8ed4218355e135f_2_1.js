function(el) {
            SymPy.MobileShell.superclass.renderToolbar.call(this, el);
            Ext.DomHelper.insertAfter(
                this.promptEl,
                {
                    tag: 'div',
                    id: 'sympy-live-toolbar-history',
                    children: [{
                                   tag: 'button',
                                   id: 'button-history-prev',
                                   html: '\u2191'
                               }, {
                                   tag: 'button',
                                   id: 'button-history-next',
                                   html: '\u2193'
                               }]
                }, true);
            var insertEl = Ext.get(
                this.submitEl.query('option[value="enter"]')[0]);
            var submitEl = Ext.get(
                this.submitEl.query('option[value="shift-enter"]')[0]);
            insertEl.set({value: "enter-inserts-newline"}).update("inserts newline");
            submitEl.set({value: "enter-submits"}).update("submits");
            this.submitEl.next().remove();			
            Ext.DomHelper.insertBefore(this.submitEl,{
                 tag: 'span',
                 html: 'Enter '
            });
            this.historyPrevEl = Ext.get("button-history-prev");
            this.historyNextEl = Ext.get("button-history-next");
        }