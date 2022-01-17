function PageManager(page) {
    this.page = page;

    try { xmlhttp = new XMLHttpRequest(); } // all except IE
    catch (e) { // IE
        try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
    }

    this.getWidth = function() {
        if (self.innerWidth) // all except IE
            return self.innerWidth;

        if (document.documentElement &&
            document.documentElement.clientWidth) // IE 6 strict
            return document.documentElement.clientWidth;

        if (document.body) // other IE's
            return document.body.clientWidth;
    }
    
    this.getHeight = function() {
        if (self.innerHeight) // all except IE
            return self.innerHeight;

        if (document.documentElement &&
            document.documentElement.clientHeight) // IE 6 strict
            return document.documentElement.clientHeight;

        if (document.body) // other IE's
            return document.body.clientHeight;
    }

    this.showPageContent = function() {
        if ((xmlhttp.readyState == 4) || (xmlhttp.readyState=="complete")) {
            if (xmlhttp.status == 200) {
                document.getElementById('content_body').innerHTML =
                    xmlhttp.responseText; 
                onPageContentLoaded();
            }
        }
    }

    this.loadPageContent = function(callback) {
        onPageContentLoaded = callback;
        var url = this.page;
        url = url + '&window_width=' + this.getWidth();
        url = url + '&window_height=' + this.getHeight();
        xmlhttp.onreadystatechange = this.showPageContent;
        xmlhttp.open('GET', url, true);
        xmlhttp.send(null);
    }
}