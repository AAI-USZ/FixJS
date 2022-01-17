function (event)
        {

            /* TAG */
            if(this.isDrawing) {
                this.doDraw(event);
            } else {
                this.doSnap(event);
                this._showFeedbackOnMouseMove(event);
            }

            this.drawLastSnap();        // Required cleanup for both Draw/Feedbacks

        }