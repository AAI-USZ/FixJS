function() {
            // count horizontal spaces
            var countHorizontal = Math.round(this.width / this.frameW);
            
            // count vertical spaces
            var countVertical = Math.round(this.height / this.frameH);
            
            // for each vertical space
            for ( var height = 0; height < countVertical; height++ ) {
                // for each horizontal space setup x and y coordinates
                for ( var slice = 0; slice < countHorizontal; slice++ ) {
                    // Push a new x and y array object for the current frame
                    this.map.push({
                        x: this.frameW * slice,
                        y: this.frameH * height
                    });
                }
            }
        }