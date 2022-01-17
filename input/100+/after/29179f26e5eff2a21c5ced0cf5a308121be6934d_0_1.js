function(file, frameW, frameH) {
            var self = this;
            
            // Set animation width and height
            this.frameW = frameW;
            this.frameH = frameH;
                        
            // Create url string
            this.url = this.path + file;
            
            // Force reset map to prevent prototypical inheritance bug of appending maps
            this.map = [];
            
            // Get image and create it
            this.img = new Image();
            this.img.src = this.url;
            this.img.onload = function() {
                self.width = self.img.width;
                self.height = self.img.height;
                    
                // Since everything has been loaded for the image, slice it
                self.slice();   
            }
        }