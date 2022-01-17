function(conn, type, tabName) {
        var src_name = conn[0].indexOf('.') < 0 ? '' : conn[0].split('.')[0],
            dst_name = conn[1].indexOf('.') < 0 ? '' : conn[1].split('.')[0],
            con_name = src_name+'-'+dst_name,
            src_fig = self.figures[src_name],
            dst_fig = self.figures[dst_name],
            con = self.connections[con_name];

        if (!con) {
            con = new draw2d.Connection();
            con.setCoronaWidth(10);
            con.setColor(flow_colors[type]);

            if (src_name.length > 0) {
                con.setSource(src_fig.getPort("output"));
//                if (type != 'data')
//                    con.setRouter(new draw2d.BezierConnectionRouter());
                con.setZOrder(self.getZOrder()+2);
            }
            else {
                src_port = new draw2d.OutputPort();
                src_port.setWorkflow(workflow);
                src_port.setName(con_name);
                src_port.setCanDrag(false);
                src_port.setId(con_name);
                self.inputsFigure.addPort(src_port,0,0);
                con.setSource(src_port);
                con.setRouter(null);
                con.setZOrder(self.getZOrder()+1);
            }

            if (dst_name.length > 0) {
                con.setTarget(dst_fig.getPort("input"));
                con.setTargetDecorator(new draw2d.ArrowConnectionDecorator());
//                if (type != 'data')
//                    con.setRouter(new draw2d.BezierConnectionRouter());
                con.setZOrder(self.getZOrder()+2);
            }
            else {
                dst_port = new draw2d.InputPort();
                dst_port.setWorkflow(workflow);
                dst_port.setName(con_name);
                dst_port.setCanDrag(false);
                dst_port.setId(con_name);
                self.outputsFigure.addPort(dst_port,0,0);
                con.setTarget(dst_port);
                con.setTargetDecorator(new draw2d.ArrowConnectionDecorator());
                con.setRouter(null);
                con.setZOrder(self.getZOrder()+1);
            }

            // context menu
            con.getContextMenu=function(){
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
            };

            // double click brings up connection frame if between two components
            // FIXME: usually doesn't work... DataflowFigure steals the clicks
            if ((src_name.length > 0) && (dst_name.length > 0)) {
                if (type == 'data') {
                    con.onDoubleClick = function() {
                        var f = new openmdao.ConnectionsFrame(self.openmdao_model,
                                                 self.pathname,src_name,dst_name);
                    };
                }
                else {
                    var driver = (type == 'parameter') ? src_name : dst_name;
                    con.onDoubleClick = function() {
                        var f = new openmdao.ComponentFrame(self.openmdao_model,
                                                            self.pathname+'.'+driver);
                    };
                }
            }

            workflow.addFigure(con);
            self.connections[con_name] = con;
        }
    }