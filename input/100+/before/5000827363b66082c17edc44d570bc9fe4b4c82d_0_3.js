function (curr_x, curr_y) {

    var ret = {};

    if (this.handleClicked !== null) {
        // Button is activated when cursor is still in the element ROI, otherwise action is void.
        if (this.isInROI(curr_x, curr_y)) {
            // Click on button is completed, the button is no more triggered.
            this.triggered = false;
            // Copy the array before modifying it
            // TODO this is a shallow copy
            var points = this.values.points.slice();
            points[this.handleClicked][0] = curr_x;
            points[this.handleClicked][1] = curr_y;
            ret = {"slot" : "knobvalue", "value" : points};
            return ret;
        }
        else {
        	// Out of ROI, end this here
        	// Copy the array before modifying it
        	// TODO this is a shallow copy
            var points = this.values.points.slice();
            // Calculate where to stop
            points[this.handleClicked][0] = (curr_x < this.ROILeft + this.ROIWidth) ? curr_x : (this.ROILeft + this.ROIWidth);
            points[this.handleClicked][0] = (curr_x > this.ROILeft) ? curr_x : this.ROILeft;
            points[this.handleClicked][1] = (curr_y < this.ROITop + this.ROIHeight) ? curr_y : (this.ROITop + this.ROIHeight);
            points[this.handleClicked][1] = (curr_y < this.ROITop) ? curr_y : this.ROITop;
            // Stop the drag action
        	this.handleClicked = null;
        	
        }
    }
    
    // Action is void, button was upclicked outside its ROI or never downclicked
    // No need to trigger anything, ignore this event.
    return undefined;
    
}