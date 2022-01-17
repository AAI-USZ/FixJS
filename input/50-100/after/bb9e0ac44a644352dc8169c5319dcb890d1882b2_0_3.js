function (ownerContext) {
                var me = this,
                    layout = me.layout,
                    dom = layout.innerCt.dom,
                    scrollPos = Math.min(me.getMaxScrollPosition(), ownerContext.innerCtScrollPos),
                    pos = dom.scrollWidth - dom.clientWidth - scrollPos;

                dom.scrollLeft = Ext.isIE ? scrollPos : pos;
            }