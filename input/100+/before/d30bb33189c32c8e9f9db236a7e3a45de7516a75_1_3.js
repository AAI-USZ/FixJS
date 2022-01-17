function(itm,e) {
                    var o = itm.options;
                    var id = this.menu.record.id;
                    if (o.confirm) {
                        Ext.Msg.confirm('',o.confirm,function(e) {
                            if (e == 'yes') {
                                var a = Ext.urlEncode(o.params || {action: o.action});
                                var s = 'index.php?id='+id+'&'+a;
                                location.href = s;
                            }
                        },this);
                    } else {
                        var a = Ext.urlEncode(o.params || {action: o.action});
                        var s = 'index.php?id='+id+'&'+a;
                        location.href = s;
                    }
                }