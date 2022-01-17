function(v) // not a valid action - must use addItems..
    {
         
        this.reset();

        if (this.store.isLocal) {
            // then we can use the store to find the values..
            // comma seperated at present.. this needs to allow JSON based encoding..
            this.hiddenEl.value  = v;
            var v_ar = [];
            Roo.each(v.split(','), function(k) {
                Roo.log("CHECK " + this.valueField + ',' + k);
                var li = this.store.query(this.valueField, k);
                if (!li.length) {
                    return;
                }
                add = {};
                add[this.valueField] = k;
                add[this.displayField] = li.item(0).data[this.displayField];
                
                this.addItem(add);
            }, this) 
            
                
            
        }
        
        
    }