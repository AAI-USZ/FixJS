function(eventType, evt) {
        if(this.nodeType === 'Shape') {
            evt.shape = this;
        }

        var stage = this.getStage();
        var mouseoverNode = stage ? stage.mouseoverShape : null;
        var mouseoutNode = stage ? stage.mouseoutShape : null;
        var el = this.eventListeners;
        var okayToRun = true;

        /*
         * determine if event handler should be skipped by comparing
         * parent nodes
         */
        if(eventType === 'mouseover' && mouseoutNode && mouseoutNode._id === this._id) {
            okayToRun = false;
        }
        else if(eventType === 'mouseout' && mouseoverNode && mouseoverNode._id === this._id) {
            okayToRun = false;
        }

        if(el[eventType] && okayToRun) {
            var events = el[eventType];
            for(var i = 0; i < events.length; i++) {
                events[i].handler.apply(this, [evt]);
            }
        }

        var mouseoverParent = mouseoverNode ? mouseoverNode.parent : undefined;
        var mouseoutParent = mouseoutNode ? mouseoutNode.parent : undefined;

        // simulate event bubbling
        if(!evt.cancelBubble && this.parent && this.parent.nodeType !== 'Stage') {
            this._handleEvent.call(this.parent, eventType, evt);
        }
    }