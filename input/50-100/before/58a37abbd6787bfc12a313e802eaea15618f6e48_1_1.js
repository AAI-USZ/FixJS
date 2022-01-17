function(data, e){
        this.tree.fireEvent("enddrag", this.tree, data.node, e);
        if (this.scroller !== false) {
            Roo.log('clear scroller');
            window.clearInterval(this.scroller);
            this.scroller =false;
            
        }
        
    }