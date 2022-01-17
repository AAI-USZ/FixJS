function(){
            for (var event in this.keyHandlers) {
                $(this.target).unbind(event, this._handler);
            }
            this.keyHandlers = {};
            this.rules = [];
            this.history = [];
            delete this._handler;
            this.lock = false;
        }