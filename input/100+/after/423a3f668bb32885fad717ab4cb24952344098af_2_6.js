function() {
    var self = this,
        connected = [],
        unconnected = [],
        x0 = this.getAbsoluteX(),
        y0 = this.getAbsoluteY(),
        margin = this.margin,
        x = x0 + margin,
        y = y0 + margin + this.cornerHeight,
        row_height = 0,
        canvas_width = this.getWorkflow().getWidth();

    jQuery.each(self.figures, function(idx,fig) {
        if (fig.isConnected()) {
            connected.push(fig);
        }
        else {
            unconnected.push(fig);
        }
    });

    // add some room for incoming arrowheads
    if ((this.drawDriverFlows) ||
        (self.inputsFigure && self.inputsFigure.getPorts().size > 0)) {
        y = y + self.cornerHeight;
    }

    // connected components are laid out diagonally (top left to bottom right)
    jQuery.each(connected,function(idx,fig) {
        fig.setPosition(x,y);
        x = x + fig.getWidth()  + margin;
        y = y + fig.getHeight() + margin;
    });

    // unconnected components are laid out in rows
    x = x0 + margin;
    jQuery.each(unconnected,function(idx,fig) {
        fig.setPosition(x,y);
        x = x + fig.getWidth() + margin;
        fig_height = fig.getHeight();
        if (fig_height > row_height) {
            row_height = fig_height;
        }
        if (x > canvas_width) {
            x = x0 + margin;
            y = y + row_height + margin;
            row_height = 0;
        }
    });

    // resize
    self.resize();

    // line up assembly inputs and outputs with their component ports
    jQuery.each(self.connections, function(name,conn) {
        var src_port = conn.getSource(),
            dst_port = conn.getTarget();

        if (src_port.getName() === name) {
            // source port is on the assembly
            var dstX = dst_port.getAbsoluteX(),
                X0 = self.inputsFigure.getAbsoluteX();
            src_port.setPosition(dstX-X0,0);
        }

        if (dst_port.getName() === name) {
            // destination port is on the assembly
            var srcY = src_port.getAbsoluteY(),
                Y0 = self.outputsFigure.getAbsoluteY();
            dst_port.setPosition(0,srcY-Y0);
      }
    });

    // layout parent to accomodate new size
    var parent = self.getParent();
    if (parent instanceof openmdao.DataflowFigure) {
        parent.layout();
    }
}