function(items) {
        var l = items.length;
        for(var i = 0; i < l; i++) {
            var options = items[i];
            
            if (options == '-') {
                this.menu.add('-');
                continue;
            }
            var h = Ext.emptyFn;
            if (options.handler) {
                h = eval(options.handler);
                if (h && typeof(h) == 'object' && h.xtype) {
                    h = this.loadWindow.createDelegate(this,[h],true);
                }
            } else {
                h = function(itm) {
                    var o = itm.options;
                    var id = this.menu.record.id;
                    if (o.confirm) {
                        Ext.Msg.confirm('',o.confirm,function(e) {
                            if (e == 'yes') {
                                var act = Ext.urlEncode(o.params || {action: o.action});
                                location.href = 'index.php?id='+id+'&'+act;
                            }
                        },this);
                    } else {
                        var act = Ext.urlEncode(o.params || {action: o.action});
                        location.href = 'index.php?id='+id+'&'+act;
                    }
                };
            }
            this.menu.add({
                id: options.id || Ext.id()
                ,text: options.text
                ,scope: options.scope || this
                ,options: options
                ,handler: h
            });
        }
    }