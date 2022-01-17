function(keyArgs){
    this._dimensions = {};
    this._visibleDatums = new def.Map();
    
    var owner,
        atoms,
        atomsBase,
        parent = this.parent = def.get(keyArgs, 'parent') || null;
    if(parent){
        // Not a root
        this.root    = parent.root;
        this.depth   = parent.depth + 1;
        this.type    = parent.type;
        this._datums = def.get(keyArgs, 'datums') || def.fail.argumentRequired('datums');
        
        owner = parent.owner;
        atoms = def.get(keyArgs, 'atoms') || def.fail.argumentRequired('atoms');
        atomsBase = parent.atoms;
    } else {
        // Root (topmost or not)
        this.root = this;
        // depth = 0
        
        var linkParent = def.get(keyArgs, 'linkParent') || null;
        if(linkParent){
            // A root that is not topmost - owned, linked
            owner = linkParent.owner;
            //atoms = pv.values(linkParent.atoms); // is atomsBase, below
            
            this.type    = owner.type;
            this._datums = def.get(keyArgs, 'datums') || linkParent._datums.slice();
            this._leafs  = [];
            
            /* 
             * Inherit link parent atoms.
             */
            atomsBase = linkParent.atoms;
            //atoms = null
            
            /*global data_addLinkChild:true */
            data_addLinkChild.call(linkParent, this);
        } else {
            // Topmost root - an owner
            owner = this;
            //atoms = null
            atomsBase = {};

            this.type = def.get(keyArgs, 'type') || def.fail.argumentRequired('type');
            
            // Only owner datas cache selected datums
            this._selectedDatums = new def.Map();
        }
    }
    
    /*global data_syncDatumsState:true */
    data_syncDatumsState.call(this);
    
    // Must anticipate setting this (and not wait for the base constructor)
    // because otherwise new Dimension( ... ) fails.
    this.owner = owner;
    
    /* Need this because of null interning/uninterning and atoms chaining */
    this._atomsBase = atomsBase;
    
    this.type.dimensionsList().forEach(function(dimType){
        var name = dimType.name,
            dimension = new pvc.data.Dimension(this, dimType);
        
        this._dimensions[name] = dimension;
    }, this);
    
    // Call base constructors
    this.base(owner, atoms, atomsBase);
    
    pv.Dom.Node.call(this, /* nodeValue */null); // TODO: remove this when possible
    
    delete this.nodeValue;
    
    this._children = this.childNodes; // pv.Dom.Node#childNodes
    
    // Build label and child key
    this.absLabel = this.label = this.buildLabel(atoms);

    // The absolute key is relative to the root data (not the owner)
    this.absKey = this.key;
    if(parent){
        /*global data_addChild:true */
        data_addChild.call(parent, this);
        
        if(parent.absLabel){
            /*global complex_labelSep:true */
            this.absLabel = def.string.join(complex_labelSep, parent.absLabel, this.label);
        }
        
        if(parent.absKey){
            this.absKey = def.string.join(",", parent.absKey, this.key);
        }
    }
}