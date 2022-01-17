function(){
            $(this.target).unbind(this.event, this._handler);
            this.keyHandlers = {};
            this.rules = [];
            this.history = [];
            delete this._handler;
            this.lock = false;
        }