function(response) {
    if (response && response.html) {
        $('#content').html(response.html);
    }
    
    if (response && response.action) {
        switch(response.action) {
            case 'reload':
                var url = parent.window.location.href.split('#');
                window.location = url[0];
            break;
        }
    }
    
}