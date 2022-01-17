function (event) {
            var change = {};
            if (this.id == event.data.transformX.id) {
                change.x = this.value;
            } else if (this.id == event.data.transformY.id) {
                change.y = this.value;
            } else if (this.id == event.data.width.id) {
                change.width = this.value;
            } else if (this.id == event.data.height.id) {
                change.height = this.value;
            } else if (this.id == event.data.rotation.id) {
                change.rotation = this.value;
            } else if (this.id == event.data.refX.id) {
                change.refX = this.value;
            } else if (this.id == event.data.refY.id) {
                change.refY = this.value;
            } else if (this.id == event.data.zIndex.id) {
                change.zIndex = this.value;
            } else if (this.id == event.data.scaleX.id) {
                change.scaleX = this.value;
            } else if (this.id == event.data.scaleY.id) {
                change.scaleY = this.value;
            }
            
            
            dojo.publish("/animdetailswidget/updateSelectedObject", [change]);
		}