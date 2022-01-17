function() {
                                    editor.find(Ext.getCmp("search:"+id).value,{
                                        backwards: false,
                                        wrap: true,
                                        caseSensitive: false,
                                        wholeWord: false,
                                        regExp: false
                                        });
                                    editor.focus();
                                }