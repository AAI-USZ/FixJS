function (color, core) {
        var isFlipping = this.isFlipping(),
            isHalfwayFlipped = this.isHalfwayFlipped(),
            colorChanged,
            coreChanged,
            coreMatchesColor;
        
        // We have two options.  If we have started flipping but are less than 50% flipped, all we have
        // to do is change to the target for the end of the flip.  Otherwise, we need to do a full 
        // flip, moving from the current color to the target.  In this case, we need to store the 
        // current state as the previous.
        if (!isFlipping || isHalfwayFlipped) {
            this.oldColor = this.color;
            this.oldCore = this.core;
        }
        
        // Update the color.
        this.color = color !== undefined ? color : core;
        this.core = core;
        
        if (!isFlipping) {
            // If a flip isn't currently in progress, start flipping
            
            colorChanged = this.oldColor !== this.color;
            coreChanged = this.oldCore !== this.core;
            coreMatchesColor = this.core === this.color;
            
            // If nothing has changed, quit.
            if (!coreChanged && !colorChanged) {
                return;
            }
            
            // If only the core changed, refresh without animating.
            // Otherwise, flip the whole piece.
            if (coreChanged && !colorChanged) {
                this.refresh();
            } else {
                this.startFlipping();
            }
            
        } else if (isHalfwayFlipped) {
            // Piece is overhalfway done. Make it reverse directions.
            this.tick = this.FLIP_STEPS - this.tick;
        }
    }