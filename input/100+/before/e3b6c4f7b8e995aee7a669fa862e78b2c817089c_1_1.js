function(myModel,pathname,type,filled){
    this.myModel = myModel;
    this.pathname = pathname;
    this.type = type;
    this.filled = filled;
    this.cornerWidth=15;
    this.cornerHeight=15;
    this.outputPort=null;
    this.inputPort=null;
    draw2d.Node.call(this);
    this.setDimension(100,50);
    this.originalHeight=-1;

    // get name for this figure and set title appropriately
    this.name = openmdao.Util.getName(pathname);
    this.setTitle(this.name);

    // set the content text to be the type name (in italics)
    var tok = type.split('.');
    if (tok.length > 1) {
        this.setContent('<center><i>'+tok[tok.length-1]+'</i></center>');
    }
    else {
        this.setContent('<center><i>'+String(type)+'</i></center>');
    }

    // do not allow moving (TODO: allow moving)
    this.setCanDrag(false);

    if (! this.filled) {
        //this.setColor(new draw2d.Color(0,255,0));
        this.header.style.color="#CC0000";
        this.textarea.style.color="#CC0000";
    }
}