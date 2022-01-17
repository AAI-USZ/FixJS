function(action){
        if(this._parallel){
            this._parallel.actions.push(action);
            this._parallel = null;
        }else{
            this.queue.push(action);
        }

        var e = new enchant.Event("addedtotimeline");
        e.timeline = this;
        action.dispatchEvent(e);

        e = new enchant.Event("actionadded");
        e.action = action;
        this.dispatchEvent(e);

        return this;
    }