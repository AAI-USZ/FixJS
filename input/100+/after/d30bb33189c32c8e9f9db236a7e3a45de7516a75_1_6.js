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
                    var w = Ext.get('modx_content');
                    if (o.confirm) {
                        Ext.Msg.confirm('',o.confirm,function(e) {
                            if (e == 'yes') {
                                var a = Ext.urlEncode(o.params || {action: o.action});
                                var s = 'index.php?id='+id+'&'+a;
                                if (w === null) {
                                    location.href = s;
                                } else { w.dom.src = s; }
                            }
                        },this);
                    } else {
                        var a = Ext.urlEncode(o.params || {action: o.action});
                        var s = 'index.php?id='+id+'&'+a;
                        if (w === null) {
                            location.href = s;
                        } else { w.dom.src = s; }
                    }
                };
            }
            this.menu.add({
                id: options.id || Ext.id()
                ,text: options.text
                ,scope: this
                ,options: options
                ,handler: h
            });
        }
    }