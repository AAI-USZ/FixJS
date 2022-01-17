function(model, pathname, type, valid, maxmin){
    this.openmdao_model = model;
    this.pathname = pathname;
    this.name = openmdao.Util.getName(pathname);
    this.type = type || '';
    this.valid = valid;
    this.maxmin = maxmin;

    this.cornerWidth=15;
    this.cornerHeight=15;

    this.outputPort=null;
    this.inputPort=null;

    draw2d.CompartmentFigure.call(this);

    this.setTitle(this.name);

    var tok = this.type.split('.');
    if (tok.length > 1) {
        this.contentHTML = '<center><i>'+tok[tok.length-1]+'</i></center>';
    }
    else {
        this.contentHTML = '<center><i>'+this.type+'</i></center>';
    }
    this.setContent(this.contentHTML);

    this.defaultBackgroundColor=new draw2d.Color(255,255,255);
    this.highlightBackgroundColor=new draw2d.Color(250,250,200);

    this.setDimension(this.getMinWidth(),this.getMinHeight());

    // do not allow moving or resizing
    this.setCanDrag(false);
    this.setResizeable(false);

    this.inputsFigure = null;
    this.outputsFigure = null;

    this.figures = {};
    this.connections = {};
    this.margin = 20;

    if (this.pathname === '') {
        // global dataflow figure is transparent with no border
        this.html.style.border = 'none';
    }
    else {
        // set background color
        this.setBackgroundColor(this.defaultBackgroundColor);

        // set initial color based on valid status
        if (this.valid === true) {
            this.setColor(new draw2d.Color(0,255,0));
        }
        else if (this.valid === false) {
            this.setColor(new draw2d.Color(255,0,0));
        }

        // listen for changes to valid status due to execution
        topic = pathname+'.exec_state';
        model.addListener(topic,this.setExecState.bind(this));
    }

}