function(el){
        window.scrollTo(0, (document.body.scrollHeight - 1000));
        var page = 1;
        if(window.location.href.match('page='))
            page = window.location.href.match(/page=(\d+)/)[1];
        var pages = document.getElementById('u0_2').getElementsByTagName('span')[0].innerHTML;
        if(page !== pages){
            window.location.href.match('page=') ? document.location = document.location.replace('page=' + page, 'page=' + pages) : document.location = document.location + '&page=' + pages;
        }
        messageListHelper.hasJustScrolled = true;
    }