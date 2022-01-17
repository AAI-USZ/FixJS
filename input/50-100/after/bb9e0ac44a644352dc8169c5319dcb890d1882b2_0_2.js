function (ownerContext) {
                var me = this,
                    layout = me.layout,
                    dom = layout.innerCt.dom,
                    pos = dom.scrollWidth - dom.clientWidth - dom.scrollLeft;

                this.callParent(arguments);
                ownerContext.innerCtScrollPos = Ext.isIE ? dom.scrollLeft : pos;
            }