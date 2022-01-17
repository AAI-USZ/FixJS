function(event) {
        try {
            if(event.state && event.state.isRadar) {
                console.log('popping state',JSON.stringify(event.state.selected));
                Radar.urlController.set('toBeRestored',event.state.selected);
                Radar.urlController.set('selectedFromURL',event.state.selected);
            }
        }
        catch(e){
            console.log(e);
        }
    }