function(v)
    {
        // this recieves an object, if setValues is called.
        this.reset();
        this.el.dom.value = v[this.displayField];
        this.hiddenEl.dom.value = v[this.valueField];
        if (typeof(v[this.valueField]) != 'string' || !v[this.valueField].length) {
            return;
        }
        var keys = v[this.valueField].split(',');
        var display = v[this.displayField].split(',');
        for (var i = 0 ; i < keys.length; i++) {
            
            add = {};
            add[this.valueField] = keys[i];
            add[this.displayField] = display[i];
            this.addItem(add);
        }
      
        
    }