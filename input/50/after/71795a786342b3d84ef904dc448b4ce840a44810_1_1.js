function (event)
        {

            /* TAG */
            if(this.isDrawing) {
                this.doDraw(event);
            } else {
                this.doSnap(event);
            }

            this.drawLastSnap();        // Required cleanup for both Draw/Feedbacks

        }