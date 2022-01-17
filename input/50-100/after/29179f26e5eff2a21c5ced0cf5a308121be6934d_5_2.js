function() {
                if (this.el) {
                    this.el.src = cp.audio.url + this.playlist[this.count] + cp.audio.type;
                    
                // Create audio track for the first time
                } else {
                    this.el = new Audio(cp.audio.url + this.playlist[this.count] + cp.audio.type);
                }
            }