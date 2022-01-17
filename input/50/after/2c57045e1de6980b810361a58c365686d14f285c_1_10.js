function() {
                                    editor.find(Ext.getCmp("search:"+id).value);
                                    editor.replace(Ext.getCmp("replace:"+id).value);
                                    editor.focus();
                                }