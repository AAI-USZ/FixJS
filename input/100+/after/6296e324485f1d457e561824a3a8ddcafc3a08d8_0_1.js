function(event) {

        switch ( event.keyCode ) {

        case 27: // escape key
            input.val("");
            filter(true);
            break;

        case 38: // up
            input.val("");
            filter(false);
            window.scrollTo(0, $("body").offset().top);
            input.focus();
            break;

        case 33: //page up
            input.val("");
            filter(false);            
            break;

        case 34: //page down
            input.val("");
            filter(false);            
            break;            

        default: 
            window.scrollTo(0, $("#mbrsel").offset().top);
            filter(true);        
            break;

        }        
    }