function(data){
        $('#content').html(data);
        if(url != 'main.html') {
            window.location.hash = url;
        }
    }