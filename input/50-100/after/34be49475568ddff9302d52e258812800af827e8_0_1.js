function(){
        var link = 'https://www.facebook.com/dialog/oauth' + 
            '?client_id=' + appID +
            '&redirect_uri=' + redirectURI +
            '&scope=publish_stream,share_item,offline_access,manage_pages';
            $(authorizeElement).href = link;
        if($(accessTokenElement).value == ''){
            $(authorizeElement).innerHTML = 'Connect to FB';
            $(authorizeElement).set('class', 'fbconnect');
        }else{
            $(authorizeElement).innerHTML = 'Remove FB Connection';
            $(authorizeElement).set('class', 'fbdisconnect');
        }
    }