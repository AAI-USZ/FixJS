function(){
    var width, height, i,
        x0=this.getAbsoluteX(),
        y0=this.getAbsoluteY(),
        xmin=999999, xmax=0,
        ymin=999999, ymax=0,
        children = this.getChildren(),
        inport = null,  inportX = null,
        outport = null, outportY = null;

    for (i=0; i<children.size; i++) {
        child = children.get(i);
        if (child instanceof openmdao.DataflowFigure) {
            x = child.getAbsoluteX();
            if (x < xmin) {
                xmin = x;
            }
            x = x + child.getWidth();
            if (x > xmax) {
                xmax = x;
            }
            y = child.getAbsoluteY();
            if (y < ymin) {
                ymin = y;
            }
            y = y + child.getHeight();
            if (y > ymax) {
                ymax = y;
            }
        }
    }

    width  = xmax-xmin+this.margin*2;
    height = ymax-ymin+this.margin*2 + this.cornerHeight;

    if (this.inputsFigure && this.inputsFigure.getPorts().size > 0) {
        height = height + this.cornerHeight;
    }

    if (this.outputsFigure && this.outputsFigure.getPorts().size > 0) {
        width = width + this.cornerWidth;
    }

    this.setDimension(width,height);

    if (this.inputsFigure) {
        this.inputsFigure.setDimension(width - 2*this.margin, 1);
        this.inputsFigure.setPosition(x0 + this.margin,
                                      y0 + this.cornerHeight + 2);
    }

    if (this.outputsFigure) {
        this.outputsFigure.setDimension(1, height - this.cornerHeight - this.margin);
        this.outputsFigure.setPosition(x0 + width - 2,
                                       y0 + this.cornerHeight);
    }
}