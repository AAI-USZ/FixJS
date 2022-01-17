function(){
        var e, action = this.queue.shift();
        e = new enchant.Event("actionend");
        e.timeline = this;
        action.dispatchEvent(e);

        if(this.looped){
            e = new enchant.Event("removedfromtimeline");
            e.timeline = this;
            action.dispatchEvent(e);

            action.frame = 0;

            this.add(action);
        }else{
            // イベントを発行して捨てる
            e = new enchant.Event("removedfromtimeline");
            e.timeline = this;
            action.dispatchEvent(e);
        }
        this.dispatchEvent(new enchant.Event("enterframe"));
    }