function(rowIdx) {
        var rowView = this.renderedRows[rowIdx];
        if (!rowView) { return; }

        console.log('La view '+rowIdx+' à été caché');
        delete this.renderedRows[rowIdx];
        rowView.set('isVisible', false);
        this.rowsCache.push(rowView);
        if (this.deRenderedHook){
            Em.run.later(rowView, this.deRenderedHook, 50);
        }
    }