function (ownerContext) {
                var me = this,
                    layout = me.layout,
                    dom = layout.innerCt.dom,
                    scrollPos = Math.min(me.getMaxScrollPosition(), ownerContext.innerCtScrollPos);

                dom.scrollLeft = dom.scrollWidth - dom.clientWidth - scrollPos;
            }