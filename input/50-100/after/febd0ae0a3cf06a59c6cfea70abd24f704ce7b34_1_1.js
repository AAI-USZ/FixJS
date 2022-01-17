function(service) {
        var options = "location=0,status=0,width=800,height=500";
        var url = "/oauth/" + service + "_connect";
        this.connect_window = window.open(url, '_blank', options);
        _gaq.push(['_trackEvent', 'reader_intro', 'Connect to ' + this.service.name + ' attempt']);
    }