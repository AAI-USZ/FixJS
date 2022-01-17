function(e) {
                            if (e == 'yes') {
                                var a = Ext.urlEncode(o.params || {action: o.action});
                                var s = 'index.php?id='+id+'&'+a;
                                location.href = s;
                            }
                        }