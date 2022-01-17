function() {
            if(Radar.urlController.get('selectedFromURL').indexOf(this.path) != -1) {
                this.set('selected',true);
            }
            else {
                this.set('selected',false);
            }
        }