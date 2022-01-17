function(itm) {
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
                }