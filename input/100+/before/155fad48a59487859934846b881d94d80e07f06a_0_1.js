function onIO(){ // socket ready
        // try to restore last options
        updateOrder(getCookie('order'));
        updateMode(getCookie('mode'));
        // change things at user will
        $('#order').change(function(){ updateOrder(); redrawItems(); }); 
        $('#mode').change(function(){ updateMode(); redrawItems(); });        
         
        loadFolder(getURLfolder(), function onFolder(){ // folder ready

            /* support for the BACK button: when the user clicks the BACK button, the address bar changes going out of   
                sync with the view. We fix it ASAP. I don't know an event for the address bar, so i'm using an setInterval. */         
            setInterval(function onBackSupport(){
                var shouldBe = getURLfolder(); 
                if (currentFolder != shouldBe) {
                    loadFolder(shouldBe);        
                } 
            }, 300);

        }); // don't redraw        
    }