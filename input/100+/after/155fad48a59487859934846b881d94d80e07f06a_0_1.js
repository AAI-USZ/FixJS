function onJQ(){ // dom ready
    socket = io.connect(window.location.origin);
    
    socket.on('connect', function onIO(){ // socket ready
        log('connected');
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
    });//socket connect
    
    socket.on('vfs.changed', function(data){
        log(data);
        // it would be nicer to update only the changed item, but for now easily reload the whole dir  
        var folder = dirname(data.uri);
        if (folder === currentFolder) {
            loadFolder();            
        }
    });

    // item hovering
    $('.item-link').live({
        mouseenter: function(){
            if (!$(this).isOverflowed()) return; // fine!
            // our label is clipped
            var lbl = $(this).find('.item-label');
            // make some changes so it's hopefully fully visible  
            lbl.addClass('full-label');
            // if no bg was assigned, the enlarged label may overlap other elements, and its transparency may cause very bad readability 
            if (isTransparent(lbl.css('background-color'))) {
                lbl.css('background-color', lbl.getClosestBackgroundColor() || '#fff')
                    .data('remove bg', true);
            }
        },
        mouseleave: function(){
            // undo changes made few lines above
            var lbl = $(this).find('.full-label');
            lbl.removeClass('full-label');
            if (lbl.data('remove bg')) {
                lbl.css('background-color','');
                lbl.removeData('remove bg',null);
            }
        },
    });//live

}