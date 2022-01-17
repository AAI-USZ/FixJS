function(evt){
                this.browser.publish( '/jbrowse/v1/v/tracks/hide', [trackConfig]);
                evt.stopPropagation();
            }