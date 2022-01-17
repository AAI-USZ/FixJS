function(config){
    var el = config.el;
    var tree = config.tree;
    delete config.tree; 
    delete config.el; // hopefull!
    
    // wrapper for IE7 strict & safari scroll issue
    
    var treeEl = el.createChild();
    config.resizeEl = treeEl;
    
    
    
    Roo.TreePanel.superclass.constructor.call(this, el, config);
 
 
    this.tree = new Roo.tree.TreePanel(treeEl , tree);
    //console.log(tree);
    this.on('activate', function()
    {
        if (this.tree.rendered) {
            return;
        }
        //console.log('render tree');
        this.tree.render();
    });
    
    this.on('resize',  function (cp, w, h) {
            this.tree.innerCt.setWidth(w);
            this.tree.innerCt.setHeight(h);
            //this.tree.innerCt.setStyle('overflow-y', 'auto');
    });

        
    
}