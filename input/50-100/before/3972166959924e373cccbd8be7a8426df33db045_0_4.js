function(rowIdx) {
        var rowView = this.renderedRows[rowIdx];
        if (!rowView) { return; }

        this.rowsCache.push(rowView);
        delete this.renderedRows[rowIdx];
        if (this.deRenderedHook){
            Em.run.later(rowView, this.deRenderedHook, 50);
        }
    }