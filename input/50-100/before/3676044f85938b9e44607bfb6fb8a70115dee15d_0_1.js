function(response) {
    if (response && response.html) {
        $('#content').html(response.html);
    }
    
    if (response && response.action) {
        switch(response.action) {
            case 'reload':
                window.location = window.location;
            break;
        }
    }
    
}