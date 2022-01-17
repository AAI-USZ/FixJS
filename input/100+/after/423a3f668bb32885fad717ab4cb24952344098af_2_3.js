function(){
                var menu=new draw2d.Menu();
                if (type == 'data') {
                    menu.appendMenuItem(new draw2d.MenuItem("Edit Connections",null,
                        function(){
                            var f = new openmdao.ConnectionsFrame(self.openmdao_model,
                                                 self.pathname,src_name,dst_name);
                        })
                    );
                }
                else {
                    var driver = (type == 'parameter') ? src_name : dst_name;
                    menu.appendMenuItem(new draw2d.MenuItem("Edit Driver", null,
                        function() {
                            var f = new openmdao.ComponentFrame(self.openmdao_model,
                                                                self.pathname+'.'+driver,
                                                                tabName);
                        })
                    );
                }
                menu.setZOrder(self.getZOrder()+3);
                return menu;
            }