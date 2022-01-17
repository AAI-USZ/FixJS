function(){
        var link = 'https://www.facebook.com/dialog/oauth' + 
            '?client_id=' + appID +
            '&redirect_uri=' + redirectURI +
            '&scope=publish_stream,share_item,offline_access,manage_pages';
            $( authorizeElement).href = link;
        if($(accessTokenElement).value == ''){
            $( authorizeElement).set('class', 'fbconnect');
            $( authorizeElement).text = 'Connect to FB';
        }else{
            $( authorizeElement).set('class', 'fbdisconnect');
            $( authorizeElement).text = 'Remove FB Connection';
        }
    }