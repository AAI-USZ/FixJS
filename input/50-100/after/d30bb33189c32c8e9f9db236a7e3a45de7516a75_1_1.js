function(e) {
                            if (e == 'yes') {
                                var act = Ext.urlEncode(o.params || {action: o.action});
                                location.href = 'index.php?id='+id+'&'+act;
                            }
                        }