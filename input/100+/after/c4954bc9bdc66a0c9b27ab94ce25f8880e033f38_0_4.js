function () {
        var ctx = this.getDrawingContext(),
            newList = [],
            oldList = this.redrawingPieceList,
            item, rect;
        
        // Consume the redraw list one at a time, rendering the piece and moving the piece to the new
        // redraw list *if* further animation is required.
        while (oldList.length > 0) {
            item = oldList.shift();
            rect = this.getPieceArea(item.row, item.column);
            
            // Translate and scale the context around the selected piece.
            // This gives `draw` a consistent 100x100 area to work with.
            ctx.save();
            ctx.translate(rect.x + rect.w / 2, rect.y + rect.h / 2);
            ctx.scale(rect.w / 100, rect.h / 100);
            
            // Draw the item
            if (item.draw(ctx)) {
                newList.push(item);
            }
            
            ctx.restore();
        }
        
        // Set the redraw list to the new list of animating pieces.
        // If the list is empty, stop the animation interval.
        this.redrawingPieceList = newList;
        
        if (newList.length === 0) {
            clearInterval(this.redrawIntervalId);
            delete this.redrawIntervalId;
        }
    }