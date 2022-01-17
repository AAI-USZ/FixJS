function() {
        var self = this;
        
        // Prep XML HTTP request
        this.loadXmlHttp.open('GET', 'include/images.php',true);
        this.loadXmlHttp.send();
        
        // When request is complete
        this.loadXmlHttp.onreadystatechange = function() {
            if (self.loadXmlHttp.readyState === 4 && self.loadXmlHttp.status === 200) {
                // Prep data
                var images = JSON.parse(self.loadXmlHttp.responseText);        
                
                // Increment number of game items
                self.total += images.length;
                
                // Loop through all items
                // http://www.mennovanslooten.nl/blog/post/62
                for ( var i = images.length; i--; ) {
                    var img = new Image();
                    var imgName = images[i];
                    img.src = self.imgUrl + images[i];
                    
                    img.onload = (function(val) {
                        // returning a function forces the load into another scope
                        return function() {
                            self.count++;
                        }
                    })(i);
                }
            }
        }
    }