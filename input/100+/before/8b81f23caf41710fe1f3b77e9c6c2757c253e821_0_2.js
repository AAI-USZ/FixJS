function(command, obj) {
        let index = this._results.length + this._offset;
        let result = new Result('>>> ' + command, obj, index);
        this._results.push(result);
        this._resultsArea.add(result.actor);
        if (obj instanceof Clutter.Actor)
            this._setBorderPaintTarget(obj);

        let children = this._resultsArea.get_children();
        if (children.length > this._maxItems) {
            this._results.shift();
            children[0].destroy();
            this._offset++;
        }
        this._it = obj;

        // Scroll to bottom
        this._notebook.scrollToBottom(0);
    }