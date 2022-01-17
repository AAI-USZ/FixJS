function() {
        var urlParts = document.URL.split('?');
        var selectedExpr = /selected=(.*)/g;
        try {
            var selectedString = selectedExpr.exec(decodeURIComponent(urlParts[1]))[1];
            return JSON.parse(selectedString);
        }
        catch(e) {
            window.history.pushState('','',urlParts[0]);
            return [];
        }
    }