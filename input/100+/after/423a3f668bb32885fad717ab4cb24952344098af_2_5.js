function(json) {
    if (!json.hasOwnProperty('components')) {
        return;
    }

    var self=this,
        workflow = this.getWorkflow(),
        src_port, dst_port;

    if (! workflow) {
        // this can happen if the figure was deleted from the canvas
        // while we were waiting for the json data
        return;
    }

    this.setContent('');

    jQuery.each(json.components,function(idx,comp) {
        var name = comp.name,
            type = comp.type,
            valid = comp.valid,
            maxmin = comp.is_assembly ? '+' : '',
            fig = self.figures[name];

        if (!fig) {
            if (self.pathname) {
                figname = self.pathname+'.'+name;
            }
            else {
                figname = name;
            }
            fig = new openmdao.DataflowFigure(self.openmdao_model,
                                              figname, type, valid, maxmin);
            self.figures[name] = fig;
            self.addChild(fig);
            workflow.addFigure(fig,0,0);
        }

        if (fig.maxmin === '-' || self.pathname ==='') {
            fig.maximize();
        }
    });

    if (!self.inputsFigure) {
        self.inputsFigure = new draw2d.Node();
        self.inputsFigure.html.style.border = 'none';
        self.addChild(self.inputsFigure);
        workflow.addFigure(self.inputsFigure,0,0);
    }

    if (!self.outputsFigure) {
        self.outputsFigure = new draw2d.Node();
        self.outputsFigure.html.style.border = 'none';
        self.addChild(this.outputsFigure);
        workflow.addFigure(self.outputsFigure,0,0);
    }

    var flow_colors = {
        data:       new draw2d.Color(100,100,100),
        parameter:  new draw2d.Color(200,000,000),
        constraint: new draw2d.Color(000,200,000),
        objective:  new draw2d.Color(000,000,200)
    };

    var displayFlow = function(conn, type, tabName) {
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
    };

    flows = [];
    if (this.drawDataFlows) {
        jQuery.each(json.connections, function(idx, flow) {
            displayFlow(flow, 'data', 'Inputs'); });
        flows = flows.concat(json.connections);
    }
    if (this.drawDriverFlows) {
        jQuery.each(json.parameters, function(idx, flow) {
            displayFlow(flow, 'parameter', 'Parameters'); });
        flows = flows.concat(json.parameters);
        jQuery.each(json.constraints, function(idx, flow) {
            displayFlow(flow, 'constraint', 'Constraints'); });
        flows = flows.concat(json.constraints);
        jQuery.each(json.objectives, function(idx, flow) {
            displayFlow(flow, 'objective', 'Objectives'); });
        flows = flows.concat(json.objectives);
    }

    // remove any component figures that are not in the updated data
    jQuery.each(self.figures,function(name,fig){
        var found = false;
        jQuery.each(json.components, function(idx,comp) {
            if (comp.name === name) {
                found = true;
            }
        });
        if (!found) {
            fig.minimize();
            workflow.removeFigure(fig);
            self.removeChild(fig);
            delete self.figures[name];
        }
    });

    jQuery.each(self.connections,function(name,fig){
        var found = false;
        jQuery.each(flows, function(idx,conn) {
            var src_name = conn[0].indexOf('.') < 0 ? '' : conn[0].split('.')[0],
                dst_name = conn[1].indexOf('.') < 0 ? '' : conn[1].split('.')[0],
                con_name = src_name+'-'+dst_name;
            if (con_name === name) {
                found = true;
            }
        });
        if (!found) {
            workflow.removeFigure(fig);
            delete self.connections[name];
        }
    });

    this.layout();
}