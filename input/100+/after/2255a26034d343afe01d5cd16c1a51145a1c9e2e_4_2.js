function() {
        var self = this;
        
        // Prep XML http request
        var loadXmlHttp = new XMLHttpRequest();
        loadXmlHttp.open('GET', 'include/sound-files.php', true);
        loadXmlHttp.send();
        
        // Request complete logic
        loadXmlHttp.onreadystatechange = function() {
            if (loadXmlHttp.readyState === 4 && loadXmlHttp.status === 200) {
                // Unstringify data
                var sounds = JSON.parse(loadXmlHttp.responseText);
                
                self.total += sounds.length;
                
                // Loop through all items
                for ( var s = sounds.length; s--; ) {                    
                    // Create sound file from proper location
                    var sound = new Audio(cp.audio.url + sounds[s] + cp.audio.type);
                    
                    // returning a function forces the load into another scope
                    sound.addEventListener('canplaythrough', (function(val) {
                        self.count++;
                    })(s));
                }
            }
        };
    }