function Keys(opt){
        opt = opt || {};
        var self = this;
        this.target = opt.target || document;
        this.event = opt.event || "keydown";
        this.keyHandlers = {};
        this.rules = [];
        this.sequence = {};
        this.sequenceNums = [];
        this.history = [];
        this.trace = opt.trace;
        this.traceStack = opt.traceStack || [];
        this._handler = function(ev){
            if ( this !== ev.target && (/textarea|select/i.test(ev.target.nodeName) 
                    || ev.target.type === "text") ) {
                return;
            }
            var handlers = self.keyHandlers[self.event];
            if (!handlers) {
                return;
            }
            var possible = getKeys(ev),
                handler,
                queue_handler,
                is_disabled = self.lock || !self.check(this, ev);

            if (is_disabled) {
                return;
            }
            for (var i in possible) {
                handler = handlers[i];
                if (handler) {
                    break;
                }
            }

            if (self.sequenceNums.length) {
                var history = self.history;
                history.push(i);
                if (history.length > 10) {
                    history.shift();
                }

                if (history.length > 1) {
                    for (var j = self.sequenceNums.length - 1; j >= 0; j--) {
                        queue_handler = handlers[history.slice(0 - self.sequenceNums[j]).join("->")];
                        if (queue_handler) {
                            if (self.trace) {
                                self._trace(j);
                            }
                            queue_handler.apply(this, arguments);
                            history.length = 0;
                            return;
                        }
                    }
                }
            }

            if (handler) {
                if (self.trace) {
                    self._trace(i);
                }
                handler.apply(this, arguments);
            }

        };

        $(this.target).bind(this.event, this._handler);
    }