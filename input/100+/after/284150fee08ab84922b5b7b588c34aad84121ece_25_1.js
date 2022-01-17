function(parent, keyArgs){
    if(pvc.debug >= 4){
        this.id = def.nextId('scene');
    }
    
    this._renderId   = 0;
    this.renderState = {};
    
    pv.Dom.Node.call(this, /* nodeValue */null);
    
    this.parent = parent || null;
    this.root   = this;
    if(parent){
        // parent -> ((pv.Dom.Node#)this).parentNode
        // this   -> ((pv.Dom.Node#)parent).childNodes
        // ...
        var index = def.get(keyArgs, 'index', null);
        parent.insertAt(this, index);
        this.root = parent.root;
    } else {
        /* root scene */
        this._active = null;
        this._panel = def.get(keyArgs, 'panel') || 
            def.fail.argumentRequired('panel', "Argument is required on root scene.");
    }
    
    /* DATA */
    var group = def.get(keyArgs, 'group', null),
        datum;
    if(group){
        datum = group._datums[0]; // null on empty datas (just try hiding all series with the legend)
    } else {
        datum = def.get(keyArgs, 'datum');
    }
    
    this.datum = datum || null;
    this.group = group;

    var source = (datum || group);
    this.atoms = source ? source.atoms : null;
    
    /* VARS */
    this.vars = parent ? Object.create(parent.vars) : {};
}