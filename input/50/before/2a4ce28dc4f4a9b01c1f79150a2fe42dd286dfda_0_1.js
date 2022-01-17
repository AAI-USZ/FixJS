function(whichRow) {
            this.unhighlight();
            whichRow.$node.addClass('highlight');
            this._highlighted = whichRow;
            this.trigger('highlight');
            return this;
        }