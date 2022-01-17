function(){
    var self = this,
        menu = new draw2d.Menu(),
        model = this.openmdao_model,
        pathname = this.pathname,
        name = this.name,
        connections = this.connections;

    if (name.length > 0) {
        // menu header
        menu.appendMenuItem(new draw2d.MenuItem("<b>"+name+"</b>",null,function(){
        }));

        // properties
        menu.appendMenuItem(new draw2d.MenuItem("Edit",null,function(){
            cf = new openmdao.ComponentFrame(model,pathname);
        }));

        // properties
        menu.appendMenuItem(new draw2d.MenuItem("Properties",null,function(){
            var id = (pathname+'-properties').replace(/\./g,'-');
            f = new openmdao.PropertiesFrame(id,model).editObject(pathname);
        }));

        // connections (internal) or disconnect (external)
        if ((this.maxmin === '-') || (Object.keys(connections).length > 0)) {
            menu.appendMenuItem(new draw2d.MenuItem("Connections",null,function(){
                var f = new openmdao.ConnectionsFrame(model, pathname);
            }));
        }
        else {
            var asm = openmdao.Util.getPath(pathname);
            if (asm.length > 0) {
                menu.appendMenuItem(new draw2d.MenuItem("Disconnect",null,function(){
                    var cmd = asm + '.disconnect("'+name+'");';
                    model.issueCommand(cmd);
                }));
            }
        }

        // run
        menu.appendMenuItem(new draw2d.MenuItem("Run",null,function(){
            var cmd = pathname + '.run();';
            model.issueCommand(cmd);
        }));

        // remove
        menu.appendMenuItem(new draw2d.MenuItem("Remove",null,function(){
            model.removeComponent(pathname);
        }));

        menu.setZOrder(999999);
    }

    return menu;
}