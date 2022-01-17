function() {
        if (this.models.length == 0) {
            debugger;
            if (app.get('type') == 'client') {
                this.find_local_clients( function(clients) {
                    //console.log('found clients',clients);
                });
            }
        } else {
            // set selected client if one has selected attribute
            var selected = this.get_selected();
            if (selected) {
                this.selected = selected;
                if (window.app) {
                    console.log(app.get('type'),'restored selected client',this.selected);
                }
            } else {
                console.log('init post fetch -- no client had selected attribute');
            }
        }
    }