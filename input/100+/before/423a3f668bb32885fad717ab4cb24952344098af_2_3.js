function(){
                var menu=new draw2d.Menu();
                menu.appendMenuItem(new draw2d.MenuItem("Edit Connections",null,
                    function(){
                        var f = new openmdao.ConnectionsFrame(self.openmdao_model,
                                                 self.pathname,src_name,dst_name);
                    })
                );
                menu.setZOrder(self.getZOrder()+3);
                return menu;
            }