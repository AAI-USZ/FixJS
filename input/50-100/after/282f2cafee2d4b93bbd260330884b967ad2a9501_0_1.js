function async_load(){
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '/js/' + language + '/search.js?2012-07-01T11:41:34+01:00';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }