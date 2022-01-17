function (side, value, animate) {
            var top = /top/i.test(side),
                me = this,
                dom = me.dom;
            if (!top) {
                if (dom === document.body || dom === document.documentElement) {
                    value = -value;
                } else {
                    value = dom.scrollWidth - dom.clientWidth - value;
                }
            }
            return this.callParent([side, value, animate]);
        }